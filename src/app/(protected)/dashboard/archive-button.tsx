"use client"

import { Button } from '@/components/ui/button'
import UseProject from '@/hooks/use-project'
import UseRefetch from '@/hooks/use-refectch'
import { api } from '@/trpc/react'
import React from 'react'
import { toast } from 'sonner'

const ArchiveButton = () => {
    const archiveProject = api.project.archiveProject.useMutation()
    const { project } = UseProject()
    const refetch = UseRefetch()
    return (
        <Button disabled={archiveProject.isPending} size='sm' variant={'destructive'} onClick={() => {
            const confirm = window.confirm('Are you sure you want to archive this project?')
            if (confirm) {
                archiveProject.mutate({ projectId: project!.id }, {
                    onSuccess: () => {
                        toast.success('Project archived successfully')
                        refetch()
                    },
                    onError: () => {
                        toast.error("Failed to archive project")
                    }
                })
            }
        }}>
            Archive
        </Button>
    )
}

export default ArchiveButton