import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenSquareIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AddDialog } from "./Add";
import { DeleteDialog } from "./Delete";
import { EditDialog } from "./Edit";
import { Input } from "@/components/ui/input";
import { fetchQuestionsList } from "@/api/questions";
import { Question } from "@/types/types";

export function QuestionsTable() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  // Fetch teachers from API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetchQuestionsList();
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Filtered Questions
  const filteredQuestions = questions.filter((question) => {
    const query = searchQuery.toLowerCase();

    if (!query) return true;
    return question.text.toLowerCase().includes(query);
  });

  // Add Question
  const handleAddQuestion = () => {
    setAddDialogOpen(false);
    fetchQuestions();
  };

  // Edit Question
  const handleEditQuestion = () => {
    setEditDialogOpen(false);
    fetchQuestions();
  };

  // Delete Question
  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prev) =>
      prev.filter((question) => question._id !== questionId)
    );
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-10 py-16">
        <div className="w-full flex flex-col justify-between gap-10">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-3xl font-medium">Questions Management</h1>
            <button
              className="text-lg font-medium bg-[#22C55E] text-white px-4 py-2 rounded-md hover:bg-[#22c563] transition duration-200 cursor-pointer"
              onClick={() => setAddDialogOpen(true)}>
              Add Question
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Input
              placeholder="Search Questions..."
              className="h-12 placeholder:text-lg bg-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-700"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="uppercase text-zinc-400">
                  <TableHead>S.No</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question, index) => (
                    <TableRow key={question._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{question.text}</TableCell>
                      <TableCell className="text-right">
                        <div className="space-x-5">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedQuestion(question);
                              setEditDialogOpen(true);
                            }}>
                            <PenSquareIcon className="text-amber-500" />
                          </button>
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedQuestion(question);
                              setDeleteDialogOpen(true);
                            }}>
                            <Trash2 className="text-red-500" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <div className="text-gray-500 text-lg">
                        No questions found.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Dialogs with props */}
        <AddDialog
          isOpen={isAddDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={handleAddQuestion}
        />

        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onEdit={handleEditQuestion}
          question={selectedQuestion}
        />

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={() => handleDeleteQuestion(selectedQuestion?._id || "")}
          questionId={selectedQuestion?._id}
        />
      </div>
    </>
  );
}
