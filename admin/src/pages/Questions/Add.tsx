import { useState } from "react";
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
import { AddQuestionProps } from "@/types/types";
import { addQuestion } from "@/api/questions";

export const AddDialog = ({ isOpen, onClose, onAdd }: AddQuestionProps) => {
  const [text, setText] = useState("");

  const handleAdd = async () => {
    try {
      const newQuestion = await addQuestion({ text });
      onAdd(newQuestion);
      setText("");
      onClose();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setText("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Text</label>
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
            <Button variant="destructive" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default" type="button" onClick={handleAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
