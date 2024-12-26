'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { api, RouterOutputs } from '@/trpc/react'

import { VideoIcon } from 'lucide-react'

import React from 'react'


type Props = {
    meetingId: string
}

const IssuesList = ({ meetingId }: Props) => {
    const { data: meeting, isLoading } = api.project.getMeetingById.useQuery({ meetingId }, {
        refetchInterval: 4000
    })

    if (isLoading || !meeting) return <div className="dark:text-gray-300">Loading...</div>
    return (
        <>
            <div className='p-8'>
                <div className='mx-auto flex max-w-2xl items-center justify-between gap-x-8 border-b dark:border-gray-700 pb-6 lg:mx-0 lg:max-w-none'>
                    <div className='flex items-center gap-x-6'>
                        <div className='rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700 p-3'>
                            <VideoIcon className='w-8 h-8 dark:text-gray-300' />
                        </div>
                        <h1>
                            <div className='text-sm leading-6 text-gray-600 dark:text-gray-400'>
                                Meeting on {" "} {meeting.createdAt.toLocaleDateString()}
                            </div>
                            <div className='mt-1 text-base font-semibold leading-6 text-gray-900 dark:text-gray-100'>
                                {meeting.name}
                            </div>
                        </h1>
                    </div>
                </div>
                <div className='h-4'></div>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
                    {meeting.Issue.map(issue => (
                        <IssueCard issue={issue} key={issue.id} />
                    ))}
                </div>
            </div>
        </>
    )
}

function IssueCard({ issue }: { issue: NonNullable<RouterOutputs["project"]["getMeetingById"]>["Issue"][number] }) {
    const [open, setOpen] = React.useState(false)
    {
        return (
            <>
                <Dialog open={open} onOpenChange={() => setOpen(false)}>
                    <DialogContent className="dark:bg-gray-800 dark:text-gray-100">
                        <DialogHeader>
                            <DialogTitle className="dark:text-gray-100">
                                {issue.gist}
                            </DialogTitle>
                            <DialogDescription className="dark:text-gray-400">
                                {issue.createdAt.toLocaleDateString()}
                            </DialogDescription>
                            <p className='text-gray-600 dark:text-gray-300'>
                                {issue.headline}
                            </p>
                            <blockquote className='mt-2 border-l-4 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4'>
                                <span className='test-sm test-gray-600 dark:text-gray-300'>
                                    {issue.start} - {issue.end}
                                </span>
                                <p className='font-medium italic leading-relaxed test-gray-900 dark:text-gray-100'>
                                    {issue.summary}
                                </p>
                            </blockquote>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Card className='relative dark:bg-gray-800 dark:border-gray-700'>
                    <CardHeader>
                        <CardTitle className='text-xl dark:text-gray-100'>
                            {issue.gist}
                        </CardTitle>
                        <div className='border-b dark:border-gray-700'></div>
                        <CardDescription className="dark:text-gray-400">
                            {issue.headline}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setOpen(true)} className="dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white">
                            Details
                        </Button>
                    </CardContent>
                </Card>
            </>
        )
    }
}

export default IssuesList