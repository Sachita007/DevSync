"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import UseRefetch from '@/hooks/use-refectch'
import { api } from '@/trpc/react'
import { on } from 'events'
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
    const refetch = UseRefetch()

    const onSubmit = async (data: FormInput) => {
        console.log(data)
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

        return true
    }
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
                            <div className='h-2'></div>
                            <Button type='submit' className='bg-primary text-white rounded-md p-2 px-4'>
                                Create Project
                            </Button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage