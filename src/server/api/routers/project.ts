import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { indexGithubRepo } from "@/lib/github-loader";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                githubUrl: z.string(),
                githubToken: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const project = await ctx.db.project.create({
                data: {
                    githubUrl: input.githubUrl,
                    name: input.name,
                    UserToProject: {
                        create: {
                            userId: ctx.user.userId!,
                        }
                    }
                }
            })
            console.log("summarising commit", process.env.GEMINI_API_KEY)
            await indexGithubRepo(project.id, input.githubUrl, input.githubToken)
            await pollCommits(project.id)
            return project
        }),
    getAllProjects: protectedProcedure.query(async ({ ctx }) => {
        const projects = await ctx.db.project.findMany({
            where: {
                UserToProject: {
                    some: {
                        userId: ctx.user.userId!
                    }
                },
                deletedAt: null
            }
        })
        return projects
    }
    ),
    getCommits: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ input, ctx }) => {
        pollCommits(input.projectId).then().catch(console.error)
        const commits = await ctx.db.commit.findMany({
            where: {
                projectId: input.projectId
            }
        })
        return commits
    }
    ),
    saveAnswer: protectedProcedure.input(z.object({
        projectId: z.string(),
        question: z.string(),
        filesReferences: z.any(),
        answer: z.string()

    })).mutation(async ({ input, ctx }) => {
        return await ctx.db.question.create({
            data: {
                answer: input.answer,
                question: input.question,
                projectId: input.projectId,
                filesReferences: input.filesReferences,
                userId: ctx.user.userId!
            }
        })
    }),
    getQuestions: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ input, ctx }) => {
        return await ctx.db.question.findMany({
            where: {
                projectId: input.projectId
            },
            include: {
                User: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
    ),
    uploadMeetings: protectedProcedure.input(z.object({
        projectId: z.string(),
        meetingUrl: z.string(),
        name: z.string()

    })).mutation(async ({ input, ctx }) => {
        const meeting = await ctx.db.meeting.create({
            data: {
                meetingUrl: input.meetingUrl,
                projectId: input.projectId,
                name: input.name,
                status: "PROCESSING"
            }
        })
        return meeting
    }),
    getMeetings: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ input, ctx }) => {
        return await ctx.db.meeting.findMany({
            where: {
                projectId: input.projectId
            }
            ,
            include: {
                Issue: true
            }
        })
    }),
    deleteMeeting: protectedProcedure.input(z.object({
        meetingId: z.string()
    })).mutation(async ({ input, ctx }) => {
        return await ctx.db.meeting.delete({
            where: {
                id: input.meetingId
            }
        })
    }),
    getMeetingById: protectedProcedure.input(z.object({
        meetingId: z.string()
    })).query(async ({ input, ctx }) => {
        return await ctx.db.meeting.findUnique({
            where: {
                id: input.meetingId
            }
        })
    }),

});
