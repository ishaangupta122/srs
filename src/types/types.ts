export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
}

export interface Teacher {
  _id?: string;
  name: string;
  semesters: string[];
  subjects: string[];
  branches: string[];
}

export interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (teacher: Teacher) => void;
}

export interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (teacher: Teacher) => void;
  teacher: Teacher | null;
}

export interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (teacherId: string) => void;
  teacherId: string | undefined;
}

export interface Question {
  _id: string;
  text: string;
}

export interface AddQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: Question) => void;
}

export interface EditQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (question: Question) => void;
  question: Question | null;
}

export interface DeleteQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (questionId: string) => void;
  questionId: string | undefined;
}
