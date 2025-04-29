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
import { EditDialogProps } from "@/types/types";

export const EditDialog = ({
  isOpen,
  onClose,
  onEdit,
  teacher,
}: EditDialogProps) => {
  return (
    <div>
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
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
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button variant="default">Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
