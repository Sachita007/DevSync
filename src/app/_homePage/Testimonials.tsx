import React, { useState } from 'react';
import { UserCircle, Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const testimonials = [
        {
            name: "Alex Chen",
            role: "Senior Developer",
            text: "DevSync has completely changed how our team works. Being able to ask questions about our codebase in plain English and get instant answers has boosted our productivity by at least 30%.",
            stars: 5,
        },
        {
            name: "Sarah Johnson",
            role: "CTO",
            text: "The meeting analysis feature alone is worth the subscription. We used to spend hours writing and reviewing meeting notes. Now DevSync does it automatically with better results than we ever had manually.",
            stars: 5,
        },
        {
            name: "John Smith",
            role: "Lead Developer",
            text: "I was skeptical at first, but after using DevSync for a month, I can't imagine going back. The AI code assistant has saved me countless hours of debugging and refactoring.",
            stars: 5,
        },
    ];

    return (
        <section id="testimonials" className="py-24 px-4 bg-slate-900 relative overflow-hidden">
            {/* Animated background gradient effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 blur-3xl rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-violet-500 blur-3xl rounded-full animate-pulse"></div>
            </div>

            <div className="container mx-auto max-w-6xl relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">What Developers Are Saying</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Join thousands of developers who have transformed their workflow with DevSync
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className={`bg-slate-800/50 border-slate-700 overflow-hidden transition-all duration-500 transform hover:scale-105 ${hoveredIndex === index ? 'border-blue-500 shadow-lg shadow-blue-900/20' : ''
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <CardContent className="p-8">
                                <div className="absolute top-6 right-6 opacity-20">
                                    <Quote size={48} className="text-blue-400" />
                                </div>

                                <div className="mb-4 flex">
                                    {[...Array(testimonial.stars)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                                    ))}
                                </div>

                                <p className="text-slate-300 mb-6 relative z-10">{testimonial.text}</p>

                                <div className="flex items-center mt-6 pt-6 border-t border-slate-700">
                                    <div className="mr-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full p-0.5">
                                        <div className="bg-slate-800 rounded-full p-0.5">
                                            <UserCircle size={40} className="text-slate-300" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{testimonial.name}</h4>
                                        <p className="text-slate-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;