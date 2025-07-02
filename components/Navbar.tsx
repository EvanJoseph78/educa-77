'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, CardSim, HelpCircle, X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const routes = [
        {
            href: '/',
            label: 'Home',
            icon: <Home className="h-5 w-5" />,
            active: pathname === '/',
        },
        {
            href: '/flashcards',
            label: 'Flashcards',
            icon: <CardSim className="h-5 w-5" />,
            active: pathname === '/flashcards',
        },
        {
            href: '/questoes',
            label: 'Questões',
            icon: <HelpCircle className="h-5 w-5" />,
            active: pathname === '/questoes',
        },
    ];

    return (
        <>
            {/* Navbar Principal */}
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-blue-600">JurisFlash</span>
                        </div>

                        {/* Navigation Links (Desktop) */}
                        <div className="hidden md:flex space-x-8">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                                        route.active
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
                                    )}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-500 hover:text-gray-600 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <>
                    {/* Fundo escuro */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Mobile */}
                    <div className="fixed top-16 left-0 right-0 bg-white shadow-lg z-50 md:hidden animate-slideDown">
                        <div className="container mx-auto px-4 py-2">
                            <div className="flex flex-col space-y-1">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            'flex items-center px-4 py-3 rounded-lg transition-colors',
                                            route.active
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        )}
                                    >
                                        <span className="mr-3">
                                            {route.icon}
                                        </span>
                                        <span className="font-medium">{route.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Espaço para o conteúdo */}
            <div className="h-16"></div>
        </>
    );
}