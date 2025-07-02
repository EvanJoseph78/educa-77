import { FlashcardType, QuestionType } from "@/types/types";

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

export const questionsData: QuestionType[] = [
  {
    id: "1",
    question: "O que é Direito em sentido subjetivo?",
    options: [
      "O conjunto de leis de um país",
      "O poder de exigir algo com base na norma jurídica",
      "As decisões dos tribunais superiores",
      "A doutrina jurídica consolidada",
    ],
    correctAnswer: "O poder de exigir algo com base na norma jurídica",
    answer:
      "Direito subjetivo é a faculdade que uma pessoa tem de exigir de outra um determinado comportamento com base em uma norma jurídica.",
    category: "Teoria Geral",
    difficulty: 1,
  },
  {
    id: "2",
    question: "O que é o veto?",
    options: [
      "Aprovação automática de um projeto de lei",
      "Discordância do Executivo sobre projeto aprovado pelo Legislativo",
      "Suspensão temporária de uma lei",
      "Decisão judicial que anula uma lei",
    ],
    correctAnswer:
      "Discordância do Executivo sobre projeto aprovado pelo Legislativo",
    answer:
      "O veto é o instrumento constitucional pelo qual o Presidente da República manifesta sua discordância em relação a um projeto de lei aprovado pelo Congresso Nacional, podendo ser total ou parcial.",
    category: "Direito Constitucional",
    difficulty: 2,
  },
  // Adicione mais questões no mesmo padrão
];
