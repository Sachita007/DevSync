"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import UseProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'
import AskQuestionCard from '../dashboard/ask-question-card'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from '../dashboard/code-refrences'

const QAPage = () => {
    const { project } = UseProject()
    const { data: questions } = api.project.getQuestions.useQuery({ projectId: project?.id ?? "" })
    const [questionIndex, setQuestionIndex] = React.useState<number>(0)
    const question = questions?.[questionIndex]
    return (
        <Sheet>
            <AskQuestionCard />
            <div className='h-4'></div>
            <h1 className='text-xl font-semibold dark:text-gray-100'> Saved Questions</h1>
            <div className='h-2'></div>
            <div className='flex flex-col gap-2'>
                {
                    questions?.map((question, index) => {
                        return <React.Fragment key={question.id}>
                            <SheetTrigger onClick={() => setQuestionIndex(index)}>
                                <div className='flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow border dark:border-gray-700'>
                                    <img className='rounded-full' height={30} width={30} src={question.User.imageUrl ?? ""} />
                                    <div className='text-left flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-gray-700 dark:text-gray-200 line-clamp-1 text-lg font-medium'>
                                                {question.question}
                                            </p>
                                            <span className='text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap'>
                                                {question.createdAt.toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className='text-gray-500 dark:text-gray-400 line-clamp-1 text-sm'>
                                        </p>
                                    </div>
                                </div>
                            </SheetTrigger>
                        </React.Fragment>
                    })
                }
            </div>
            {question && (
                <SheetContent className='sm:max-w-[80vw] overflow-scroll dark:bg-gray-800 dark:border-gray-700'>
                    <SheetHeader>
                        <SheetTitle className="dark:text-gray-100">
                            {question.question}
                        </SheetTitle>
                        <div className="markdown-wrapper ">
                            <MDEditor.Markdown
                                className="custom-scrollbar dark:text-gray-200"
                                source={question.answer}
                            />
                        </div>
                        <CodeReferences filesReferences={(question.filesReferences ?? []) as any} />
                    </SheetHeader>
                </SheetContent>
            )}
        </Sheet>
    )
}

export default QAPage