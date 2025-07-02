import { CategoryFilterProps } from '@/types/types';
import { Filter, Star } from 'lucide-react';

export default function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
    difficulties,
    selectedDifficulty,
    onDifficultyChange,
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[220px]">
                <div className="relative">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                        <Filter className="w-4 h-4 text-blue-500" />
                        <span>Categoria</span>
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
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
                    <div className="absolute left-3 top-9 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-w-[220px]">
                <div className="relative">
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                        <Star className="w-4 h-4 text-blue-500" />
                        <span>Dificuldade</span>
                    </label>
                    <select
                        id="difficulty"
                        value={selectedDifficulty}
                        onChange={(e) => onDifficultyChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                     focus:ring-2 focus:ring-blue-200 focus:border-blue-400
                     bg-white text-gray-700 appearance-none"
                    >
                        {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty === 'all'
                                    ? 'Todas Dificuldades'
                                    : `${'★'.repeat(parseInt(difficulty))} ${difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Médio' : 'Difícil'}`}
                            </option>
                        ))}
                    </select>
                    <div className="absolute left-3 top-9 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}