import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteQuestionProps } from "@/types/types";
import { deleteQuestion } from "@/api/questions";

export const DeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  questionId,
}: DeleteQuestionProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!questionId) return;

    try {
      setLoading(true);
      const data = await deleteQuestion(questionId);
      console.log("Question Deleted Successfully:\n", data);
      onDelete(questionId);
      onClose();
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
        </DialogHeader>

        <div className="text-gray-600 text-sm">
          This action cannot be undone. The question will be permanently
          deleted.
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
