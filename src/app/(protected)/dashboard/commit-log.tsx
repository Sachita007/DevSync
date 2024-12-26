'use client'
import UseProject from '@/hooks/use-project'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CommitLog = () => {
    const { project } = UseProject()
    const { data: commits } = api.project.getCommits.useQuery({ projectId: project?.id ?? "" })

    return (
        <>
            <ul className='space-y-6'>{
                commits?.map((commit, index) => {
                    return (
                        <li key={commit.id} className='relative flex gap-x-4'>
                            <div className={cn(index === commits.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center')}>
                                <div className='w-px translate-x-1 bg-gray-200 dark:bg-gray-700'>
                                </div>
                            </div>

                            <>
                                <img src={commit.commitAuthorAvatar} alt='commit avatar' className='relative mt-4 size-8 flex-none rounded-full bg-gray-500' />
                                <div className='flex-auto rounded-md bg-white dark:bg-gray-800 p-3 ring-1 ring-inset ring-gray-200 dark:ring-gray-700'>
                                    <div className='flex justify-between gap-x-4'>
                                        <Link target='_blank' href={`${project?.githubUrl}/commit/${commit.commitHash}`} className='py-0.5 text-xs leading-5 text-gray-500 dark:text-gray-400'>
                                            {commit.commitMessage}
                                            {" "}
                                            <span className='font-medium text-gray-900 dark:text-gray-100'>
                                                {commit.commitAuthorName}
                                            </span>
                                            {" "}

                                            <span className='inline-flex items-center'>
                                                commited
                                                <ExternalLink className='ml-1 size-4' />
                                            </span>
                                        </Link>
                                    </div>
                                    <span className='font-semibold dark:text-gray-200'>
                                        {commit.commitMessage}
                                    </span>
                                    <pre className='mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-500 dark:text-gray-400'>
                                        {commit.summary}
                                    </pre>
                                </div>
                            </>
                        </li>
                    )
                })
            }</ul>
        </>
    )
}

export default CommitLog