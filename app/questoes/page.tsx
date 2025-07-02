'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { BookText, Star, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { questionsData } from '@/lib/data';

export default function QuestoesPage() {
    const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

    // Filtra as questões
    const filteredQuestions = questionsData.filter(question => {
        const categoryMatch = selectedCategory === 'all' || question.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === 'all' || question.difficulty.toString() === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });

    // Extrai categorias únicas
    const categories = ['all', ...new Set(questionsData.map(q => q.category))];

    // Manipula seleção de opção
    const handleOptionSelect = (questionId: string, option: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    // Verifica se a resposta está correta
    const isAnswerCorrect = (questionId: string, option: string) => {
        const question = questionsData.find(q => q.id === questionId);
        return question?.correctAnswer === option;
    };

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Banco de Questões</h1>
                <p className="text-gray-600">Teste seus conhecimentos com questões de múltipla escolha</p>
            </header>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-blue-500" />
                            <span>Categoria</span>
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-blue-200 focus:border-blue-400
                       bg-white text-gray-700 appearance-none"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'Todas Categorias' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                            <Star className="w-4 h-4 text-blue-500" />
                            <span>Dificuldade</span>
                        </label>
                        <select
                            id="difficulty"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                       focus:ring-2 focus:ring-blue-200 focus:border-blue-400
                       bg-white text-gray-700 appearance-none"
                        >
                            {['all', '1', '2', '3'].map((difficulty) => (
                                <option key={difficulty} value={difficulty}>
                                    {difficulty === 'all'
                                        ? 'Todas Dificuldades'
                                        : `${'★'.repeat(parseInt(difficulty))} ${difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Médio' : 'Difícil'}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {filteredQuestions.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500">Nenhuma questão encontrada com os filtros selecionados.</p>
                    </div>
                ) : (
                    filteredQuestions.map((question) => (
                        <div
                            key={question.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div
                                className="p-5 cursor-pointer"
                                onClick={() => setActiveQuestionId(activeQuestionId === question.id ? null : question.id)}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <BookText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{question.question}</h3>
                                            <div className="flex gap-3 mt-2">
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {question.category}
                                                </span>
                                                <span className="flex gap-1 items-center text-xs text-gray-600">
                                                    {[1, 2, 3].map((level) => (
                                                        <span
                                                            key={level}
                                                            className={`w-2 h-2 rounded-full ${level <= question.difficulty ? 'bg-blue-400' : 'bg-gray-200'}`}
                                                        />
                                                    ))}
                                                    <span className="ml-1">
                                                        {question.difficulty === 1 ? 'Fácil' : question.difficulty === 2 ? 'Médio' : 'Difícil'}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-gray-400">
                                        {activeQuestionId === question.id ? (
                                            <ChevronDown className="w-5 h-5" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {activeQuestionId === question.id && (
                                <div className="px-5 pb-5 pt-2 border-t border-gray-100 animate-fadeIn">
                                    <div className="space-y-3 mt-3">
                                        {question.options?.map((option, index) => {
                                            const isSelected = selectedOptions[question.id] === option;
                                            const isCorrect = isAnswerCorrect(question.id, option);
                                            const showResult = selectedOptions[question.id] && question.correctAnswer;

                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => handleOptionSelect(question.id, option)}
                                                    className={`p-3 rounded-lg border cursor-pointer transition-colors
                            ${isSelected
                                                            ? showResult
                                                                ? isCorrect
                                                                    ? 'bg-green-50 border-green-300'
                                                                    : 'bg-red-50 border-red-300'
                                                                : 'bg-blue-50 border-blue-300'
                                                            : 'hover:bg-gray-50 border-gray-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center
                              ${isSelected
                                                                ? showResult
                                                                    ? isCorrect
                                                                        ? 'bg-green-100 border-green-400 text-green-600'
                                                                        : 'bg-red-100 border-red-400 text-red-600'
                                                                    : 'bg-blue-100 border-blue-400 text-blue-600'
                                                                : 'bg-gray-100 border-gray-300'
                                                            }`}
                                                        >
                                                            {String.fromCharCode(65 + index)}
                                                        </div>
                                                        <span className="text-gray-700">{option}</span>
                                                        {showResult && isCorrect && isSelected && (
                                                            <span className="ml-auto text-sm font-medium text-green-600">✓ Correta</span>
                                                        )}
                                                        {showResult && !isCorrect && isSelected && (
                                                            <span className="ml-auto text-sm font-medium text-red-600">✗ Incorreta</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {selectedOptions[question.id] && question.correctAnswer && (
                                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                            <h4 className="font-medium text-blue-800 mb-1">Explicação:</h4>
                                            <p className="text-blue-700">{question.answer}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <Navbar />
        </div>
    );
}