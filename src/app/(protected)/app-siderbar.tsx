'use client'

import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import UseProject from "@/hooks/use-project"
import { cn } from "@/lib/utils"
import { Bot, CreditCard, Layout, LayoutDashboardIcon, Plus, Presentation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"



const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboardIcon
    },
    {
        title: 'Q&A',
        url: '/qa',
        icon: Bot
    }, {
        title: 'Meetings',
        url: '/meetings',
        icon: Presentation
    },
    {
        title: 'Billing',
        url: '/billing',
        icon: CreditCard
    }
]




export function AppSidebar() {

    const pathname = usePathname()
    const { open } = useSidebar()
    const { projects, selectedProject, setSelectedProject } = UseProject()

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    {/* <Image src='/devsync-logo.png' alt='logo' width={40} height={40} /> */}
                    <Layout className="text-blue-400" width={30} height={30} />
                    {open &&
                        <h1 className="text-xl font-bold text-primary">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">DevSync</span>
                        </h1>
                    }

                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                items.map(item => {
                                    return (
                                        <SidebarMenuItem key={item.url}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} className={cn({
                                                    '!bg-primary !text-white': pathname === item.url
                                                }
                                                )}>
                                                    <item.icon />

                                                    <span >{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>


                            {
                                projects?.map(project => {
                                    return (
                                        <SidebarMenuItem key={project.name}>
                                            <SidebarMenuButton asChild>

                                                <div onClick={() => setSelectedProject(project.id)}>
                                                    <div className={cn('rounded-sm border size-6 flex items-center justify-center text-sm text-primary bg-white', {
                                                        'bg-primary text-white': project.id === selectedProject
                                                    })}>
                                                        {project.name[0]}


                                                    </div>
                                                    <span hidden={!open} >{project.name}</span>
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                            <div className="h-2"></div>
                            {open && <SidebarMenuItem>
                                <Link href='/create'>
                                    <Button variant={'outline'} className="w-fit">
                                        <Plus />
                                        Create Project
                                    </Button>
                                </Link>

                            </SidebarMenuItem>}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}