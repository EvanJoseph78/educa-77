import { FlashcardType } from '@/types/types';
import { BookText, Scale, Gavel, ClipboardList, LibraryBig } from 'lucide-react';

interface FlashcardProps {
    card: FlashcardType;
    isActive: boolean;
    isStudied: boolean;
    onClick: () => void;
    onStudyToggle: () => void;
}

const categoryIcons = {
    'Teoria Geral': <BookText className="w-5 h-5 text-blue-600" />,
    'Direito Constitucional': <Scale className="w-5 h-5 text-blue-600" />,
    'Legislação': <ClipboardList className="w-5 h-5 text-blue-600" />,
    'Direito Processual': <Gavel className="w-5 h-5 text-blue-600" />,
    'default': <LibraryBig className="w-5 h-5 text-blue-600" />
};

export default function Flashcard({
    card,
    isActive,
    isStudied,
    onClick,
    onStudyToggle,
}: FlashcardProps) {
    const CategoryIcon = categoryIcons[card.category as keyof typeof categoryIcons] || categoryIcons.default;

    return (
        <div
            className={`bg-white rounded-xl p-6 border-l-4 border-blue-400 transition-all duration-200
      shadow-sm hover:shadow-md ${isActive ? 'ring-2 ring-blue-200 shadow-md' : ''}
      ${isStudied ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-start mb-4 gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        {CategoryIcon}
                    </div>
                    <span className="text-xs font-semibold uppercase bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                        {card.category}
                    </span>
                </div>

                <div className="flex gap-1 items-center">
                    <span className="text-xs text-gray-500 mr-2">Dificuldade:</span>
                    {[1, 2, 3].map((level) => (
                        <div
                            key={level}
                            className={`w-3 h-3 rounded-full ${level <= card.difficulty ? 'bg-blue-400' : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-800 leading-snug">
                    {card.question}
                </h3>
                {isActive && (
                    <div className="flashcard-answer mt-4 pt-4 border-t border-dashed border-gray-200 text-gray-600 leading-relaxed">
                        {card.answer}
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onStudyToggle();
                    }}
                    className={`text-sm px-4 py-2 rounded-lg transition-colors ${isStudied
                        ? 'bg-green-100/80 hover:bg-green-100 text-green-800'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                >
                    {isStudied ? (
                        <span className="flex items-center gap-2">
                            <span className="text-green-600">✓</span> Estudado
                        </span>
                    ) : (
                        'Marcar como estudado'
                    )}
                </button>
            </div>
        </div>
    );
}