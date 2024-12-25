"use client"
import UseProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'

const TeamMembers = () => {
    const { project } = UseProject()
    const { data: members } = api.project.getTeamMembers.useQuery({ projectId: project?.id! })
    return (
        <div className='flex items-center gap-2'>
            {members?.map(member => (
                <img key={member.id} src={member.User.imageUrl!} alt={member.User.firstName!} height={30} width={30} className=' rounded-full' />
            ))}
        </div>
    )
}

export default TeamMembers