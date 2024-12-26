import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { checkCredits, indexGithubRepo } from "@/lib/github-loader";

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
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.user.userId!
                },
                select: {
                    credit: true
                }
            })
            if (!user) {
                throw new Error('User not found')
            }
            const currentCredits = user.credit
            const fileCount = await checkCredits(input.githubUrl, input.githubToken)
            if (currentCredits < fileCount) {
                throw new Error('Not enough credits')
            }

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
            await ctx.db.user.update({
                where: {
                    id: ctx.user.userId!
                },
                data: {
                    credit: {
                        decrement: fileCount
                    }
                }
            })
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
            },
            include: {
                Issue: true
            }
        })
    }),
    archiveProject: protectedProcedure.input(z.object({
        projectId: z.string()
    })).mutation(async ({ input, ctx }) => {
        return await ctx.db.project.update({
            where: {
                id: input.projectId
            },
            data: {
                deletedAt: new Date()
            }
        })
    }),
    getTeamMembers: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ input, ctx }) => {
        return await ctx.db.userToProject.findMany({
            where: {
                projectId: input.projectId
            },
            include: {
                User: true
            }
        })
    }),
    getMyCredits: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.user.findUnique({
            where: {
                id: ctx.user.userId!
            }
        })
    }
    ),
    checkCredits: protectedProcedure.input(z.object({
        githubUrl: z.string(),
        githubToken: z.string().optional()
    })).mutation(async ({ input, ctx }) => {
        const fileCount = await checkCredits(input.githubUrl, input.githubToken)
        const userCredits = await ctx.db.user.findUnique({
            where: {
                id: ctx.user.userId!
            },
            select: {
                credit: true
            }
        })
        return {
            fileCount,
            userCredits: userCredits?.credit || 0
        }
    }),
    getStripeTransaction: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.stripeTransaction.findMany({
            where: {
                userId: ctx.user.userId!
            }
        })
    }),

});
