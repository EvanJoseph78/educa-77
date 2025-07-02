'use client';

import { BookText, Scale, Gavel, LibraryBig, FileText, Video } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  const contentCategories = [
    {
      title: "Teoria Geral do Direito",
      icon: <BookText className="w-8 h-8 text-blue-600" />,
      items: [
        {
          id: "intro-direito",
          title: "Introdução ao Direito",
          type: "texto",
          duration: "15 min",
          progress: 80,
          filePath: "/conteudos/teoria-geral/introducao-ao-direito.md"
        },
        {
          id: "fontes-direito",
          title: "Fontes do Direito",
          type: "video",
          duration: "22 min",
          progress: 45,
          filePath: "/conteudos/teoria-geral/fontes-do-direito.md"
        },
        {
          id: "ramos-direito",
          title: "Ramos do Direito",
          type: "texto",
          duration: "10 min",
          progress: 0,
          filePath: "/conteudos/teoria-geral/ramos-do-direito.md"
        }
      ]
    },
    {
      title: "Direito Constitucional",
      icon: <Scale className="w-8 h-8 text-blue-600" />,
      items: [
        {
          id: "principios-fundamentais",
          title: "Princípios Fundamentais",
          type: "texto",
          duration: "18 min",
          progress: 100,
          filePath: "/conteudos/constitucional/principios-fundamentais.md"
        },
        {
          id: "direitos-garantias",
          title: "Direitos e Garantias",
          type: "video",
          duration: "35 min",
          progress: 60,
          filePath: "/conteudos/constitucional/direitos-e-garantias.md"
        }
      ]
    },
    // ... outras categorias com a mesma estrutura
  ];

  const recentItems = [
    {
      id: "principios-fundamentais",
      title: "Princípios Fundamentais",
      category: "Direito Constitucional",
      lastAccessed: "2 horas atrás",
      progress: 100,
      filePath: "/conteudos/constitucional/principios-fundamentais.md"
    },
    // ... outros itens recentes
  ];

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Conteúdos Jurídicos</h1>
        <p className="text-gray-600">Aprenda os principais conceitos do Direito</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText className="text-blue-500" />
          Continuar de onde parou
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentItems.map((item) => (
            <Link
              key={item.id}
              href={`/conteudo?id=${item.id}&file=${encodeURIComponent(item.filePath)}`}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow block"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-xs text-gray-500">{item.category}</span>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.lastAccessed}</span>
                <span className="text-blue-600 hover:text-blue-800 font-medium">
                  {item.progress === 100 ? 'Revisar' : 'Continuar'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Explore por Categoria</h2>
        <div className="space-y-6">
          {contentCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{category.title}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {category.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/conteudo?id=${item.id}&file=${encodeURIComponent(item.filePath)}`}
                    className="p-4 hover:bg-gray-50 transition-colors block"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${item.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {item.type === 'video' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-800">{item.title}</h4>
                          <span className="text-xs text-gray-500">{item.duration}</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              {item.progress === 0 ? 'Não iniciado' : `${item.progress}% concluído`}
                            </span>
                            <span className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                              {item.progress === 0 ? 'Começar' : item.progress === 100 ? 'Revisar' : 'Continuar'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Navbar />
    </div>
  );
}