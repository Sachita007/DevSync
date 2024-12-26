import React from 'react';
import { Zap, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Pricing() {
    const pricingPlans = [
        {
            title: "Free",
            price: "$0",
            period: "forever",
            credits: 150,
            features: [
                "150 free credits (1 credit = 1 file)",
                "Basic GitHub integration",
                "AI-powered commit summaries",
                "Limited meeting analysis",
            ],
            cta: "Get Started",
            popular: false,
        },
        {
            title: "Starter",
            price: "$10",
            period: "month",
            credits: 500,
            features: [
                "500 credits (50 credits = $1)",
                "Advanced GitHub integration",
                "AI code assistant",
                "Meeting analysis with timestamps",
                "Priority support",
            ],
            cta: "Buy Now",
            popular: true,
        },
        {
            title: "Pro",
            price: "$25",
            period: "month",
            credits: 1500,
            features: [
                "1500 credits (50 credits = $1)",
                "Unlimited GitHub integration",
                "Advanced AI insights",
                "Full meeting analysis",
                "Dedicated support",
            ],
            cta: "Buy Now",
            popular: false,
        },
    ];

    return (
        <section id="pricing" className="py-24 px-4 bg-slate-950">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Simple Pricing</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Pay as you go. Each file consumes 1 credit. 50 credits = $1. Start with 150 free credits.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative overflow-hidden border-slate-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20 ${plan.popular ? 'bg-slate-800/80 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-800/50'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-6 right-6">
                                    <Badge className="bg-blue-500 hover:bg-blue-600">
                                        <Star size={12} className="mr-1" /> Popular
                                    </Badge>
                                </div>
                            )}
                            <CardHeader className="pb-8 pt-8">
                                <CardTitle className="text-2xl font-bold mb-2">{plan.title}</CardTitle>
                                <div className="flex items-end gap-2 mt-2">
                                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{plan.price}</span>
                                    <span className="text-slate-400 mb-1">/ {plan.period}</span>
                                </div>
                                <CardDescription className="text-slate-300 mt-4 text-base">
                                    <span className="font-medium">{plan.credits} credits</span> - Perfect for {plan.title.toLowerCase()} users.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-8">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle size={16} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-2 pb-8">
                                <Button
                                    className={`w-full py-6 text-base font-medium ${plan.popular
                                        ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600'
                                        : 'bg-slate-700 hover:bg-slate-600'
                                        }`}
                                >
                                    {plan.cta}
                                    <Zap size={16} className="ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12 text-slate-300">
                    <p className="text-lg">
                        Need more? <a href="#" className="text-blue-400 hover:underline font-medium transition-colors duration-200">Contact us</a> for enterprise plans.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Pricing;