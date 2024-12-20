import { db } from '@/server/db';

import { Octokit } from 'octokit';
import { default as axios } from 'axios';


import { aiSummariseCommit } from './gemini';

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})




type Response = {
    commitHash: string,
    commitMessage: string,
    commitDate: string,
    commitAuthorName: string,
    commitAuthorAvatar: string
}
export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const { data } = await octokit.rest.repos.listCommits({
        owner: githubUrl.split('/')[3] ?? "",
        repo: githubUrl.split('/')[4] ?? ""
    })

    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
    return sortedCommits.slice(0, 10).map((commit: any) => {
        return {
            commitHash: commit.sha as string,
            commitMessage: commit.commit.message ?? "",
            commitDate: commit.commit.author.date ?? "",
            commitAuthorName: commit.commit?.author?.name ?? "",
            commitAuthorAvatar: commit.author?.avatar_url ?? ""
        }
    })
}

export const pollCommits = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId)
    console.log(project, githubUrl)
    const commitHashes = await getCommitHashes(githubUrl)

    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes)
    const summariseResponse = await Promise.allSettled(unprocessedCommits.map(commit => {
        return summariseCommit(commit.commitHash, githubUrl)
    }))
    const summarises = summariseResponse.map((response) => {
        if (response.status === 'fulfilled') {
            return response.value
        }
        return ""
    })

    const commit = await db.commit.createMany({
        data: summarises.map((summary, index) => {
            return {
                projectId: projectId,
                commitHash: unprocessedCommits[index]!.commitHash,
                commitMessage: unprocessedCommits[index]!.commitMessage,
                commitDate: unprocessedCommits[index]!.commitDate,
                commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
                commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
                summary
            }
        })
    })

    return commit

}

async function summariseCommit(commitHash: string, githubUrl: string) {

    const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
        headers: {
            Authorization: `application/vnd.github.v3+json`
        }
    })

    return await aiSummariseCommit(data) || ""
}


async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: { id: projectId },
        select: { githubUrl: true }
    })
    if (!project?.githubUrl) throw new Error('Project does not have a github url')
    return { project, githubUrl: project?.githubUrl }
}


async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]) {
    const processedCommits = await db.commit.findMany({
        where: { projectId }
    })
    const unprocessedCommits = commitHashes.filter(commit => {
        return !processedCommits.some(processedCommit => processedCommit.commitHash === commit.commitHash)
    }
    )
    return unprocessedCommits
}

