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
import { deleteTeacher } from "@/api/teachers";
import { DeleteDialogProps } from "@/types/types";

export const DeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  teacherId,
}: DeleteDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!teacherId) return;

    try {
      setLoading(true);
      // const data = await deleteTeacher(teacherId);
      // console.log("Teacher Deleted Successfully:\n", data);
      onDelete(teacherId);
      onClose();
    } catch (error) {
      console.error("Error deleting teacher:", error);
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
          This action cannot be undone. The teacher data will be permanently
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
