'use client'
import UseProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'
import MeetingCard from '../dashboard/meeting-card'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import UseRefetch from '@/hooks/use-refectch'

const MeetingsPage = () => {
    const { project } = UseProject()
    const { data: meetings, isLoading } = api.project.getMeetings.useQuery({ projectId: project?.id! }, {
        refetchInterval: 4000
    })
    const refetch = UseRefetch()

    const deleteMeeting = api.project.deleteMeeting.useMutation()
    return (
        <>
            <MeetingCard />
            <div className='h-6'></div>
            <h1 className='text-xl font-semibold dark:text-gray-100'>Meetings</h1>
            {isLoading && <div className="dark:text-gray-300">Loading...</div>}
            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                {meetings?.map(meeting => (
                    <li key={meeting.id} className='flex items-center justify-between py-5 gap-x-6'>
                        <div>
                            <div className='min-w-0'>
                                <div className='flex items-center gap-2'>
                                    <Link href={`meetings/${meeting.id}`} className='text-sm font-semibold dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200'>
                                        {meeting.name}
                                    </Link>
                                    {meeting.status === 'PROCESSING' &&
                                        <Badge className='bg-yellow-500 text-white dark:bg-yellow-600'>
                                            Processing...
                                        </Badge>
                                    }
                                </div>
                            </div>

                            <div className='flex items-center text-sx text-gray-500 dark:text-gray-400 gap-x-2'>
                                <p className='whitespace-nowrap'>{meeting.createdAt.toLocaleDateString()}</p>
                                <p className='truncate'> {meeting.Issue.length} issues</p>
                            </div>
                        </div>

                        <div className='flex items-center flex-none gap-x-4'>
                            <Link href={`meetings/${meeting.id}`}>
                                <Button size='sm' variant={'outline'} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                                    View Meeting
                                </Button>
                            </Link>
                            <Button
                                size='sm'
                                disabled={deleteMeeting.isPending}
                                variant={'destructive'}
                                className="dark:bg-red-800 dark:hover:bg-red-900"
                                onClick={() => deleteMeeting.mutate({ meetingId: meeting.id }, {
                                    onSuccess: () => {
                                        toast.success('Meeting deleted successfully'),
                                            refetch()
                                    }
                                })}
                            >
                                Delete Meeting
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MeetingsPage