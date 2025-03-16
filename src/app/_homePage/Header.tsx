import { Layout, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header({ isMenuOpen, toggleMenu }) {
    const handleClick = () => {
        console.log('clicked');
        toggleMenu(); // Close menu on sign-in click
    };

    return (
        <nav className="fixed w-full z-50 border-b border-slate-800 bg-slate-950">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Layout className="text-blue-400" size={24} />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                        DevSync
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {["Features", "How It Works", "Testimonials", "Pricing"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-slate-300 hover:text-white transition"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Desktop Sign In */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/dashboard">
                        <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90">
                            Sign In
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-slate-300" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-slate-900 z-40 pt-20 px-6 md:hidden transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-5 right-5 text-slate-300 hover:text-white"
                    onClick={toggleMenu}
                >
                    <X size={28} />
                </button>

                {/* Mobile Links */}
                <div className="flex flex-col items-center space-y-6">
                    {["Features", "How It Works", "Testimonials", "Pricing"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-slate-300 hover:text-white text-xl py-2 transition"
                            onClick={toggleMenu}
                        >
                            {item}
                        </a>
                    ))}

                    {/* Sign In Button */}
                    <div className="pt-6 w-full">
                        <Link href="/dashboard">
                            <Button className="bg-gradient-to-r w-full from-blue-500 to-violet-500 hover:opacity-90">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
