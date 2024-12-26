'use client'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { createCheckoutSession } from '@/lib/stripe'
import { api } from '@/trpc/react'
import { Info, CreditCard } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BillingPage = () => {
    const { data: user } = api.project.getMyCredits.useQuery()
    const { data: transactions } = api.project.getStripeTransaction.useQuery()
    const [creditsToBuy, setCreditsToBuy] = React.useState<number[]>([100])
    const creditsToBuyAmount = creditsToBuy[0]!
    const price = (creditsToBuyAmount / 50).toFixed(2)
    return (
        <div className="dark:text-gray-100">
            <h1 className='text-xl font-semibold dark:text-gray-100'>
                Billing
            </h1>
            <div className='h-2'></div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
                You currently have {user?.credit} credits
            </p>
            <div className='h-2'></div>
            <div className='bg-blue-50 dark:bg-blue-900/30 px-4 py-4 rounded-md border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'>
                <div className='flex items-center gap-4'>
                    <Info className='size-4' />
                    <p className='text-sm'> Each credit allows you to index 1 file in a repository.</p>
                </div>
                <p className='text-sm text-blue-600 dark:text-blue-400 ml-8'>
                    E.g. If your project has 100 files, you will need 100 credits to index it.
                </p>
            </div>
            <div className='h-4'></div>
            <Slider
                defaultValue={[100]}
                max={1000}
                min={10}
                onValueChange={value => setCreditsToBuy(value)}
                value={creditsToBuy}
                className="dark:bg-gray-700"
            />
            <div className='h-4'></div>
            <Button
                onClick={() => {
                    createCheckoutSession(creditsToBuyAmount)
                }}
                className="dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white"
            >
                Buy {creditsToBuyAmount} credits for ${price}
            </Button>

            {/* Recent Transactions Section */}
            <div className='mt-10'>
                <h2 className='text-lg font-semibold dark:text-gray-100'>Recent Transactions</h2>
                <div className='h-4'></div>

                {transactions && transactions.length > 0 ? (
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-sm dark:text-gray-300">Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {transactions.map((transaction) => (
                                    <div key={transaction.id} className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                                                <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium dark:text-gray-200">{transaction.credits} Credits</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(transaction.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium dark:text-gray-200">${(transaction.credits / 50).toFixed(2)}</p>
                                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-center p-6 border border-dashed rounded-lg dark:border-gray-600">
                        <p className="text-gray-500 dark:text-gray-400">No transaction history yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BillingPage