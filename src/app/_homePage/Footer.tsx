"use client"
import React from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-950 pt-24 pb-12 px-4 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-600/10 blur-3xl rounded-full"></div>
            </div>

            {/* Floating Card */}
            <div className="container mx-auto max-w-6xl relative z-10 mb-16">
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-blue-900/10 p-8 lg:p-12 transform -translate-y-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Ready to transform your development workflow?
                            </h3>
                            <p className="text-slate-300 mb-4">
                                Join thousands of developers who are shipping better code faster with DevSync.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-grow">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-slate-800 border-slate-700 text-slate-300 h-12"
                                />
                            </div>
                            <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 h-12">
                                Get Started
                                <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto max-w-6xl">


                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-slate-400 mb-4 md:mb-0">
                        &copy; {currentYear} DevSync. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;