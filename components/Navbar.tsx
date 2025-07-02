'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CardSim, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const pathname = usePathname();

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
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-around p-2">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'flex flex-col items-center p-3 rounded-lg transition-all',
                                route.active
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'
                            )}
                        >
                            <span className={cn(
                                'p-2 rounded-full',
                                route.active ? 'bg-blue-100' : 'bg-gray-100'
                            )}>
                                {route.icon}
                            </span>
                            <span className="text-xs mt-1 font-medium">{route.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}