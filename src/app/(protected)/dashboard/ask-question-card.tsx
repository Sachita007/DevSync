"use client"

import MDEditor from '@uiw/react-md-editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import UseProject from '@/hooks/use-project'

import Image from 'next/image'

import React, { useState } from 'react'
import { askQuestion } from './actions'
import { readStreamableValue } from 'ai/rsc'
import { set } from 'date-fns'
import CodeReferences from './code-refrences'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import UseRefetch from '@/hooks/use-refectch'

const AskQuestionCard = () => {
    const { project } = UseProject()
    const [question, setQuestion] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filesReferences, setFilesReferences] = useState<{ summary: string, sourceCode: string, fileName: string }[]>([])
    const [answer, setAnswer] = useState('')

    const saveAnswer = api.project.saveAnswer.useMutation()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAnswer('')
        setFilesReferences([])
        if (!project?.id) return
        setLoading(true)


        const { output, filesReferences } = await askQuestion(question, project.id)
        setOpen(true)
        setFilesReferences(filesReferences)
        for await (const delta of readStreamableValue(output)) {
            if (delta) {
                setAnswer(ans => ans + delta)
            }
        }
        setLoading(false)
    }
    const refetch = UseRefetch()
    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>

                <DialogContent className='sm:max-w-[80vw]'>
                    <DialogHeader>
                        <div className='flex it gap-2'>
                            <DialogTitle>
                                <Image src='/devsync-logo.png' alt='logo' width={40} height={40} />
                            </DialogTitle>
                            <Button disabled={saveAnswer.isPending} variant={'outline'} className='' onClick={() => {
                                saveAnswer.mutate({
                                    projectId: project!.id,
                                    question,
                                    filesReferences,
                                    answer
                                }, {
                                    onSuccess: () => {
                                        toast.success('Answer saved')
                                        refetch()
                                    },
                                    onError: (error) => {
                                        toast.error(error.message)
                                    }
                                })
                            }}>
                                Save Answer

                            </Button>
                        </div>

                    </DialogHeader>



                    {/* <MDEditor.Markdown className="bg-inherit p-6 max-w-[70vw] !h-full max-h-[40vh] overflow-scroll rounded-md " source={answer} /> */}
                    {/* Apply custom class and remove bg-inherit which might be causing conflicts */}
                    <div className="markdown-wrapper">
                        <MDEditor.Markdown
                            className="p-6 max-w-[70vw] !h-full max-h-[40vh] overflow-auto rounded-md custom-scrollbar"
                            source={answer}
                        />
                    </div>
                    <div className='h-4'></div>


                    <CodeReferences filesReferences={filesReferences} />
                    <Button type='button' onClick={() => { setOpen(false) }} >
                        Close
                    </Button>

                </DialogContent>
            </Dialog>
            <Card className='relative col-span-3'>
                <CardHeader>
                    Ask A Question
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Textarea placeholder='Which file should I edit to change the home page' value={question} onChange={e => setQuestion(e.target.value)} />
                        <div className='h-4'></div>
                        <Button type='submit' disabled={loading} >
                            Ask DevSync
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default AskQuestionCard