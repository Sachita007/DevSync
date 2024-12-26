import {
    Github,
    Bot,
    Mic,
    Code,
    Zap,
    FileCode,
    LineChart,
    Calendar,
    Clock,
    ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-4 bg-slate-950">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How DevSync Works</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        Get started in minutes and transform your development workflow
                    </p>
                </div>

                <Tabs defaultValue="github" className="w-full">
                    <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                        <TabsTrigger value="github" className="text-sm md:text-base">
                            <Github size={18} className="mr-2 hidden sm:inline" />
                            GitHub Sync
                        </TabsTrigger>
                        <TabsTrigger value="ai" className="text-sm md:text-base">
                            <Bot size={18} className="mr-2 hidden sm:inline" />
                            AI Insights
                        </TabsTrigger>
                        <TabsTrigger value="meetings" className="text-sm md:text-base">
                            <Mic size={18} className="mr-2 hidden sm:inline" />
                            Meeting Analysis
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="github" className="mt-0">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
                                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 text-sm text-slate-400">Repository Connection</div>
                                </div>
                                <img
                                    src="/dashboard.png"
                                    alt="GitHub Sync"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col space-y-6">
                                <h3 className="text-2xl font-bold">Connect Your GitHub Repositories</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <Github size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Authorize DevSync</h4>
                                            <p className="text-slate-300">Sign in with GitHub and authorize DevSync to access your repositories.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <Code size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Select Repositories</h4>
                                            <p className="text-slate-300">Choose which repositories you want to analyze and track.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <Zap size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Automatic Sync</h4>
                                            <p className="text-slate-300">DevSync automatically syncs with new commits and keeps your data up to date.</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-fit bg-gradient-to-r from-blue-500 to-violet-500">
                                    Connect Your Repository
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="ai" className="mt-0">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="flex flex-col space-y-6 order-2 md:order-1">
                                <h3 className="text-2xl font-bold">Powerful AI Code Analysis</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <Bot size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Ask Natural Questions</h4>
                                            <p className="text-slate-300">Query your codebase using plain English, no complex search syntax needed.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <FileCode size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Get Contextual Answers</h4>
                                            <p className="text-slate-300">Receive answers with relevant code snippets and file references.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <LineChart size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Track Development Progress</h4>
                                            <p className="text-slate-300">See smart summaries of project development and key metrics.</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-fit bg-gradient-to-r from-blue-500 to-violet-500">
                                    Try AI Assistant
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-xl order-1 md:order-2">
                                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 text-sm text-slate-400">AI Code Assistant</div>
                                </div>
                                <img
                                    src="/qa.png"
                                    alt="AI Code Assistant"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="meetings" className="mt-0">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
                                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 text-sm text-slate-400">Meeting Analysis</div>
                                </div>
                                <img
                                    src="/meeting-over.png"
                                    alt="Meeting Analysis"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col space-y-6">
                                <h3 className="text-2xl font-bold">Meeting Intelligence</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <Mic size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Upload Audio Files</h4>
                                            <p className="text-slate-300">Simply upload your MP3 meeting recordings or connect your favorite meeting platform.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <Calendar size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Get Accurate Summaries</h4>
                                            <p className="text-slate-300">Receive comprehensive summaries with key discussion points.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-blue-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                                            <Clock size={20} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Track Action Items</h4>
                                            <p className="text-slate-300">Automatically extract action items with timestamps and assignees.</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-fit bg-gradient-to-r from-blue-500 to-violet-500">
                                    Upload Meeting Recording
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}