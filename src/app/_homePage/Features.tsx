"use client"
import {
    Github,
    MessageCircleQuestion,
    Mic,
    FileCode,
    LineChart,
    Clock,
    CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function Features() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const features = [
        {
            icon: <Github size={24} className="text-blue-400" />,
            title: "GitHub Integration",
            description: "Connect your GitHub repositories and get instant access to all your project information.",
            items: [
                "One-click repository connection",
                "Automatic sync with new commits",
                "Support for multi-repo projects",
            ],
        },
        {
            icon: <LineChart size={24} className="text-blue-400" />,
            title: "Commit Analysis",
            description: "Get AI-powered summaries of all commits to understand project progress at a glance.",
            items: [
                "Smart commit categorization",
                "Visual progress tracking",
                "Trend analysis and insights",
            ],
        },
        {
            icon: <MessageCircleQuestion size={24} className="text-blue-400" />,
            title: "AI Code Assistant",
            description: "Ask questions about your codebase and get instant answers with relevant code snippets.",
            items: [
                "Natural language queries",
                "Context-aware responses",
                "File references with code samples",
            ],
        },
        {
            icon: <Mic size={24} className="text-blue-400" />,
            title: "Meeting Analysis",
            description: "Upload meeting recordings and get AI-generated summaries with action items and timestamps.",
            items: [
                "Automatic transcription",
                "Key topic extraction",
                "Action item detection with timestamps",
            ],
        },
        {
            icon: <Clock size={24} className="text-blue-400" />,
            title: "Real-time Updates",
            description: "Stay in sync with your team with real-time notifications and updates.",
            items: [
                "Instant commit notifications",
                "Team activity timeline",
                "Custom notification settings",
            ],
        },
        {
            icon: <FileCode size={24} className="text-blue-400" />,
            title: "Code Context Search",
            description: "Search your entire codebase with natural language and get context-aware results.",
            items: [
                "Semantic code search",
                "Jump to definition and references",
                "Intelligent code navigation",
            ],
        },
    ];

    return (
        <section id="features" className="py-24 px-4 bg-slate-900 relative overflow-hidden">
            {/* Animated background gradient effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-1/3 right-1/3 w-1/2 h-1/2 bg-blue-500 blur-3xl rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1/2 h-1/2 bg-violet-500 blur-3xl rounded-full animate-pulse"></div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Powerful Features</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Supercharge your development workflow with these AI-powered tools
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className={`bg-slate-800/50 border-slate-700 transition-all duration-300 transform hover:-translate-y-2 ${hoveredIndex === index ? 'border-blue-500 shadow-lg shadow-blue-900/20' : ''
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <CardHeader className="pb-2">
                                <div className={`bg-gradient-to-r from-blue-500/10 to-violet-500/10 flex p-4 rounded-lg items-center gap-4 text-white mb-4 transition-all duration-300 ${hoveredIndex === index ? 'from-blue-500/20 to-violet-500/20' : ''
                                    }`}>
                                    <div className="bg-slate-900 p-2 rounded-md">
                                        {feature.icon}
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </div>
                                <CardDescription className="text-slate-300 text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-slate-400">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <div className={`transition-all duration-500 ${hoveredIndex === index ? 'text-blue-400' : 'text-slate-500'
                                                }`}>
                                                <CheckCircle size={16} className="mt-1 mr-3 flex-shrink-0" />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}