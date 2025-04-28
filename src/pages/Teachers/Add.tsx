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
import { AddDialogProps } from "@/types/types";

export const AddDialog = ({ isOpen, onClose, onAdd }: AddDialogProps) => {
  return (
    <div>
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <Input placeholder="Enter teacher name" />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Semesters
              </label>
              <div className="flex gap-2">
                <Input placeholder="Enter semester" />
                <Button type="button">Add</Button>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Subjects</label>
              <div className="flex gap-2">
                <Input placeholder="Enter subject" />
                <Button type="button">Add</Button>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Branches</label>
              <div className="flex gap-2">
                <Input placeholder="Enter branch" />
                <Button type="button">Add</Button>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full">Save Teacher</Button>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
