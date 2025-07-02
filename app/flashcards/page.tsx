'use client';

import { useState, useEffect } from 'react';
import Flashcard from '@/components/Flashcard';
import Controls from '@/components/Controls';
import Stats from '@/components/Stats';
import CategoryFilter from '@/components/CategoryFilter';
import { FlashcardType } from '@/types/types';
import { flashcardsData } from '@/lib/data';

export default function FlashcardPlatform() {
    const [flashcards, setFlashcards] = useState<FlashcardType[]>(flashcardsData);
    const [filteredCards, setFilteredCards] = useState<FlashcardType[]>(flashcardsData);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());

    // Carrega dados salvos do localStorage
    useEffect(() => {
        const savedStudied = localStorage.getItem('studiedFlashcards');
        if (savedStudied) {
            setStudiedCards(new Set(JSON.parse(savedStudied)));
        }
    }, []);

    // Filtra os flashcards
    useEffect(() => {
        let result = [...flashcards];

        if (selectedCategory !== 'all') {
            result = result.filter(card => card.category === selectedCategory);
        }

        if (selectedDifficulty !== 'all') {
            result = result.filter(card => card.difficulty.toString() === selectedDifficulty);
        }

        setFilteredCards(result);
        setActiveCardId(null);
    }, [selectedCategory, selectedDifficulty, flashcards]);

    // Manipuladores de eventos
    const handleCardClick = (id: string) => {
        setActiveCardId(activeCardId === id ? null : id);
    };

    const handleStudyToggle = (id: string) => {
        const newStudied = new Set(studiedCards);
        if (newStudied.has(id)) {
            newStudied.delete(id);
        } else {
            newStudied.add(id);
        }
        setStudiedCards(newStudied);
        localStorage.setItem('studiedFlashcards', JSON.stringify(Array.from(newStudied)));
    };

    const handleShowAll = () => {
        setFilteredCards(prev => [...prev]);
        if (filteredCards.length > 0) {
            setActiveCardId(filteredCards[0].id);
        }
    };

    const handleHideAll = () => {
        setActiveCardId(null);
    };

    const handleReset = () => {
        setStudiedCards(new Set());
        localStorage.removeItem('studiedFlashcards');
    };

    const handleShuffle = () => {
        setFilteredCards(prev => [...prev.sort(() => Math.random() - 0.5)]);
        setActiveCardId(null);
    };

    // Extrai categorias únicas
    const categories = ['all', ...new Set(flashcards.map(card => card.category))];

    return (
        <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Plataforma Educacional de Direito</h1>
                <p className="text-gray-600">Estude os principais conceitos jurídicos através de flashcards interativos</p>
            </header>

            <div className="mb-8">
                <div className="flex flex-wrap justify-between gap-4 mb-6">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        difficulties={['all', '1', '2', '3']}
                        selectedDifficulty={selectedDifficulty}
                        onDifficultyChange={setSelectedDifficulty}
                    />
                    <Controls
                        onShowAll={handleShowAll}
                        onHideAll={handleHideAll}
                        onReset={handleReset}
                        onShuffle={handleShuffle}
                    />
                </div>

                <Stats
                    totalCards={flashcards.length}
                    studiedCards={studiedCards.size}
                    filteredCards={filteredCards.length}
                />
            </div>

            <div className="space-y-4">
                {filteredCards.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500">Nenhum flashcard encontrado com os filtros selecionados.</p>
                    </div>
                ) : (
                    filteredCards.map(card => (
                        <Flashcard
                            key={card.id}
                            card={card}
                            isActive={activeCardId === card.id}
                            isStudied={studiedCards.has(card.id)}
                            onClick={() => handleCardClick(card.id)}
                            onStudyToggle={() => handleStudyToggle(card.id)}
                        />
                    ))
                )}
            </div>
        </main>
    );
}