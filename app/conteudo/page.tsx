'use client';

import { useSearchParams } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContentPage() {
    const searchParams = useSearchParams();
    const filePath = searchParams.get('file');
    const contentId = searchParams.get('id');

    return (
        <div className="container mx-auto px-4 py-6 pb-20">
            <Link
                href="/"
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar para conteúdos
            </Link>

            {filePath ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <MarkdownRenderer filePath={filePath} />
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-500">Conteúdo não encontrado</p>
                </div>
            )}

            <Navbar />
        </div>
    );
}