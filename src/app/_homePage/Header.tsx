
import { Layout, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header({ isMenuOpen, toggleMenu }) {
    const handleClick = () => {
        console.log('clicked')
    }
    return (
        <nav className="fixed w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Layout className="text-blue-400" size={24} />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">DevSync</span>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
                    <a href="#how-it-works" className="text-slate-300 hover:text-white transition">How It Works</a>
                    <a href="#testimonials" className="text-slate-300 hover:text-white transition">Testimonials</a>
                    <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link href={`/dashboard`} >  <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90">Sign In</Button></Link>
                </div>

                <button className="md:hidden text-slate-300" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-slate-900/95 z-40 pt-20 px-6 md:hidden flex flex-col space-y-6 text-center">
                    <a href="#features" className="text-slate-300 hover:text-white text-xl py-2 transition" onClick={toggleMenu}>Features</a>
                    <a href="#how-it-works" className="text-slate-300 hover:text-white text-xl py-2 transition" onClick={toggleMenu}>How It Works</a>
                    <a href="#testimonials" className="text-slate-300 hover:text-white text-xl py-2 transition" onClick={toggleMenu}>Testimonials</a>
                    <a href="#pricing" className="text-slate-300 hover:text-white text-xl py-2 transition" onClick={toggleMenu}>Pricing</a>
                    <div className="pt-6 flex flex-col space-y-4">
                        <Button onClick={() => handleClick()} variant="outline" className="border-slate-700 w-full">Sign In</Button>
                    </div>
                </div>
            )}
        </nav>
    );
}