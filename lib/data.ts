import { FlashcardType } from "@/types/types";

export const flashcardsData: FlashcardType[] = [
  {
    id: "1",
    icon: "📘",
    question: "O que é Direito em sentido subjetivo?",
    answer:
      "É o poder que uma pessoa tem de exigir algo com base na norma jurídica.",
    category: "Teoria Geral",
    difficulty: 1,
  },
  {
    id: "2",
    icon: "⚖️",
    question: "O que é o veto?",
    answer:
      "É a discordância do Chefe do Executivo sobre um projeto aprovado pelo Legislativo. Pode ser total ou parcial.",
    category: "Direito Constitucional",
    difficulty: 2,
  },
  // ... (adicionar os outros flashcards conforme o JSON anterior)
];
