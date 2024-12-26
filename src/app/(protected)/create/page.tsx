"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import UseRefetch from '@/hooks/use-refectch'
import { api } from '@/trpc/react'
import { Info } from 'lucide-react'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'


type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}


const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()
    const checkCredits = api.project.checkCredits.useMutation()
    const refetch = UseRefetch()

    const onSubmit = async (data: FormInput) => {

        if (!!checkCredits.data) {
            createProject.mutate({
                name: data.projectName,
                githubUrl: data.repoUrl,
                githubToken: data.githubToken
            }, {
                onSuccess: () => {
                    toast.success('Project created')
                    refetch()
                    reset()
                },
                onError: (error) => {
                    toast.error(error.message)
                }
            })
        }
        else {
            checkCredits.mutate({
                githubToken: data.githubToken,
                githubUrl: data.repoUrl
            })
        }


        return true
    }
    const hasEnoughCredits = !!checkCredits?.data?.userCredits ? checkCredits.data.fileCount <= checkCredits.data.userCredits : true
    return (
        <div className='flex items-center gap-12 h-full justify-center'>
            <img src='/github.png' className='h-56 w-auto'></img>
            <div>
                <div>
                    <h1 className='font-semibold text-2xl'>
                        Link your Github Repository
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Enter the URL of your Github repository to get started
                    </p>
                    <div className='h-4'></div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input {...register('projectName', { required: true })} placeholder='ProjectName' />
                            <div className='h-2'></div>
                            <Input {...register('repoUrl', { required: true })} type='url' placeholder='Github URL' />
                            <div className='h-2'></div>
                            <Input {...register('githubToken')} placeholder='Github Token' />
                            <div className='h-4'></div>
                            {!!checkCredits.data && (
                                <div className='bg-orange-50 px-4 py-4 rounded-md border border-orange-200 text-orange-700'>
                                    <div className='flex items-center gap-4'>
                                        <Info className='size-4' />
                                        <p className='text-sm'> You will be charged <strong>{checkCredits.data?.fileCount}</strong> credits for this repository. </p>
                                    </div>
                                    <p className='text-sm text-blue-600 ml-8'>
                                        You have <strong>{checkCredits.data?.userCredits}</strong> credits remaining.
                                    </p>

                                </div>
                            )}
                            <div className='h-4'></div>
                            <Button type='submit' disabled={createProject.isPending || !!checkCredits.isPending || !hasEnoughCredits} className='bg-primary text-white rounded-md p-2 px-4'>
                                {!!checkCredits.data ? 'Create Project' : 'Check Credits'}
                            </Button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage