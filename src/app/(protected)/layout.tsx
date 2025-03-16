"use client"
import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from '@clerk/nextjs'
import { AppSidebar } from './app-siderbar'
import { ThemeProvider } from '../_components/theame-provider'
import { ModeToggle } from '../_components/model'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'



type Props = {
    children: React.ReactNode
}

const SiderbarLayout = ({ children }: Props) => {
    return (
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange

        >
            <SidebarProvider>
                <AppSidebar />
                <main className='w-full m-2'>
                    <div className='flex items-center gap-2 border-sidebar-border bg-sidebar border shadow rounded-md p-2 px-4'>
                        <SidebarTrigger >
                            <Button variant="ghost" className="md:hidden">
                                <div className="flex items-center space-x-2">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle sidebar</span>
                                </div>
                            </Button>
                        </SidebarTrigger>

                        {/* <SearchBar /> */}
                        <div className='ml-auto'></div>
                        <ModeToggle />
                        <UserButton />
                    </div>
                    <div className='h-4'></div>
                    {/* main content */}
                    <div className='border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-5rem)] p-4'>
                        {children}

                    </div>
                </main>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default SiderbarLayout