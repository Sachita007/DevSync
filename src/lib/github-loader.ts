import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import type { Document } from "@langchain/core/documents";
import { generateAiEmbedding, summariseCode } from "./gemini";
import { db } from "@/server/db";
import { Octokit } from "octokit";

export const loadGithubRepo = async (
    githubUrl: string,
    githubToken?: string,
) => {
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || process.env.GITHUB_TOKEN || "",
        branch: "main",
        ignoreFiles: [
            "package-lock.json",
            "yarn.lock",
            "pnpm-lock.yaml",
            "bun.lockb",
        ],
        recursive: true,
        unknown: "warn",
        maxConcurrency: 5,
    });

    const docs = await loader.load();
    return docs;
};

const getFileCount = async (path: string, octokit: Octokit, githubOwner: string, githubRepo: string, acc: number = 0) => {
    const { data } = await octokit.rest.repos.getContent({
        owner: githubOwner,
        repo: githubRepo,
        path
    })
    if (!Array.isArray(data) && data.type === "file") {
        return acc + 1
    }
    if (Array.isArray(data)) {
        let fileCount = 0;
        const directories: string[] = []
        for (const item of data) {
            if (item.type === "dir") {
                directories.push(item.path)
            }
            else {
                fileCount += 1
            }
        }
        if (directories.length > 0) {
            const directoryCounts = await Promise.all(
                directories.map(dirPath => getFileCount(dirPath, octokit, githubOwner, githubRepo, 0))
            )
            fileCount += directoryCounts.reduce((acc, count) => acc + count, 0)

        }
        return acc + fileCount

    }
    return acc

}

export const checkCredits = async (gtihubUrl: string, githubToken?: string) => {
    // find out how many files are in the repo
    const octokit = new Octokit({
        auth: githubToken || process.env.GITHUB_TOKEN || "",
    });
    const githubOwner = gtihubUrl.split("/")[3];
    const githubRepo = gtihubUrl.split("/")[4];
    if (!githubOwner || !githubRepo) {
        return 0;
    }
    const fileCount = await getFileCount("", octokit, githubOwner, githubRepo)
    return fileCount


}

export const indexGithubRepo = async (
    projectId: string,
    githubUrl: string,
    githubToken?: string,
) => {
    const docs = await loadGithubRepo(githubUrl, githubToken);
    const getAllEmbeddings = await generateEmbeddings(docs);
    await Promise.allSettled(
        getAllEmbeddings.map(async (embedding, index) => {
            console.log(`processing ${index + 1} of ${getAllEmbeddings.length}`);
            if (!embedding) return;

            const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
                data: {
                    summary: embedding.summary,

                    sourceCode: embedding.sourceCode,
                    fileName: embedding.fileName,
                    projectId,
                },
            });
            await db.$executeRaw`
                   UPDATE "SourceCodeEmbedding"
                   SET "summaryEmbedding" = ${embedding.embedding}::vector
                   WHERE "id"= ${sourceCodeEmbedding.id}
        `;
        }),
    );
};
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const withRetry = async <T>(fn: () => Promise<T>, retries = 10, waitTime = 20000): Promise<T> => {
    while (retries > 0) {
        try {
            return await fn(); // Attempt the API call
        } catch (error: any) {

            if (error) { // Check if rate limit error
                console.warn(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
                await delay(waitTime); // Wait for the specified time
            } else {
                throw error; // Re-throw other errors
            }
        }
        retries--;
    }
    throw new Error("Failed after multiple retries due to rate limits.");
};

const generateEmbeddings = async (docs: Document[]) => {
    return await Promise.all(
        docs.map(async (doc) => {
            const summary = await withRetry(() => summariseCode(doc)); // Retry summarizing if needed
            const embedding = await withRetry(() => generateAiEmbedding(summary)); // Retry embedding generation if needed
            // const summary = await summariseCode(doc);

            // // const embedding = await generateAiEmbedding(summary);
            // const embedding = await generateEmbeddingWithRetry(summary);

            return {
                summary,
                embedding,
                sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
                fileName: doc.metadata.source,
            };
        }),
    );
};

// Document {
//     pageContent: "\nconst errorHandler = (err, req, res, next) => {\n    err.statusCode = err.statusCode || 500;\n    err.status = err.status || 'error';\n\n    if (process.env.NODE_ENV === 'development') {\n        res.status(err.statusCode).json({\n            status: err.status,\n            error: err,\n            message: err.message,\n            stack: err.stack\n        });\n    } else {\n        // Production error handling\n        if (err.isOperational) {\n            res.status(err.statusCode).json({\n                status: err.status,\n                message: err.message\n            });\n        } else {\n            // Programming or unknown errors\n            console.error('ERROR', err);\n            res.status(500).json({\n                status: 'error',\n                message: 'Something went wrong'\n            });\n        }\n    }\n};\n\nmodule.exports = errorHandler;",
//         metadata: {
//         source: "src/utils/errorHandler.js",
//             repository: "https://github.com/Sachita007/crypto-stats-api",
//                 branch: "main",
//     },
//     id: undefined,
//   }
