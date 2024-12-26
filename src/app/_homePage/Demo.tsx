import { PlayCircle } from "lucide-react";

export function Demo() {
    return (
        <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">See DevSync in Action</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        Watch how DevSync transforms your development workflow
                    </p>
                </div>

                <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden shadow-2xl relative">
                    <img
                        src="/dashboard.png"
                        alt="DevSync Demo"
                        className="w-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-blue-500/20 backdrop-blur-sm p-8 rounded-full">
                            <PlayCircle size={64} className="text-blue-400" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}