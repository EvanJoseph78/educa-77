export interface FlashcardType {
  id: string;
  icon: string;
  question: string;
  answer: string;
  category: string;
  difficulty: number;
}

export interface StatsProps {
  totalCards: number;
  studiedCards: number;
  filteredCards: number;
}

export interface ControlsProps {
  onShowAll: () => void;
  onHideAll: () => void;
  onReset: () => void;
  onShuffle: () => void;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  difficulties: string[];
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}
