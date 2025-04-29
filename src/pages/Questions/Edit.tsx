import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditQuestionProps } from "@/types/types";
import { updateQuestion } from "@/api/questions";

export const EditDialog = ({
  isOpen,
  onClose,
  onEdit,
  question,
}: EditQuestionProps) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (question) {
      setText(question.text);
    }
  }, [question]);

  const handleEdit = async () => {
    if (!question || text.trim() === "") return;

    setLoading(true);

    try {
      const updatedQuestion = await updateQuestion(question._id, { text });
      onEdit(updatedQuestion);
      onClose();
    } catch (error) {
      console.error("Failed to edit question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setText(question ? question.text : "");
      onClose();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Text</label>
              <Input
                placeholder="Enter Question..."
                value={text}
                name="text"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="destructive" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="default" onClick={handleEdit} disabled={loading}>
              {loading ? "Editing..." : "Edit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
