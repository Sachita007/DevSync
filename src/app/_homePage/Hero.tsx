"use client"
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section className="pt-32 pb-24 px-4 md:pb-32 bg-gradient-to-br from-slate-950 to-slate-900 relative overflow-hidden">
            {/* Background animation elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    {/* Animated gradient blobs */}
                    <div className={`absolute w-96 h-96 rounded-full bg-blue-500 filter blur-3xl opacity-20 -top-20 -left-20 animate-pulse`}></div>
                    <div className={`absolute w-96 h-96 rounded-full bg-violet-500 filter blur-3xl opacity-20 top-1/2 -right-20 animate-pulse`} style={{ animationDelay: '2s' }}></div>
                    <div className={`absolute w-80 h-80 rounded-full bg-indigo-500 filter blur-3xl opacity-20 bottom-0 left-1/3 animate-pulse`} style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Particle grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiM0QjU1NjMiIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-8">
                    <div className={`inline-block bg-blue-900/30 px-4 py-1 rounded-full mb-4 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                        <span className="text-blue-400 text-sm font-medium flex items-center">
                            <span className="animate-pulse mr-1">✨</span> AI-POWERED DEVELOPMENT
                        </span>
                    </div>
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                        Sync Your Dev Process with{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent relative inline-block">
                            AI Intelligence
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 transform scale-x-0 origin-left transition-transform duration-1000 group-hover:scale-x-100" style={{ animationDelay: '400ms', transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)' }}></span>
                        </span>
                    </h1>
                    <p className={`text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-8 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                        Connect your GitHub repos, upload meeting recordings, and get AI-powered insights, summaries, and answers to your development questions.
                    </p>
                    <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                        <Link href={`/dashboard`}>  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group relative overflow-hidden">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                            <span className="relative z-10 flex items-center">
                                Get Started
                                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button></Link>
                    </div>
                </div>

                <div className={`relative mt-16 rounded-xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`} style={{ transitionDelay: '800ms' }}>
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="ml-4 text-sm text-slate-400">DevSync Dashboard</div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 z-10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
                        <img
                            src="/dashboard.png"
                            alt="DevSync Dashboard"
                            className="w-full transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}