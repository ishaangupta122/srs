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
import { useEffect, useState } from "react";
import { updateTeacher } from "@/api/teachers";
import { X } from "lucide-react";
import { useTheme } from "@/context/theme-provider";

export const EditDialog = ({
  isOpen,
  onClose,
  onEdit,
  teacher,
}: EditDialogProps) => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [semesters, setSemesters] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);

  const [semesterInput, setSemesterInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [branchInput, setBranchInput] = useState("");

  useEffect(() => {
    if (teacher) {
      setName(teacher.name || "");
      setSemesters(teacher.semesters || []);
      setSubjects(teacher.subjects || []);
      setBranches(teacher.branches || []);
    }
  }, [teacher]);

  const handleAddSemester = () => {
    if (semesterInput.trim()) {
      setSemesters([...semesters, semesterInput.trim()]);
      setSemesterInput("");
    }
  };

  const handleAddSubject = () => {
    if (subjectInput.trim()) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleAddBranch = () => {
    if (branchInput.trim()) {
      setBranches([...branches, branchInput.trim()]);
      setBranchInput("");
    }
  };

  const handleRemoveItem = (
    type: "semesters" | "subjects" | "branches",
    value: string
  ) => {
    if (type === "semesters") {
      setSemesters((prev) => prev.filter((item) => item !== value));
    } else if (type === "subjects") {
      setSubjects((prev) => prev.filter((item) => item !== value));
    } else if (type === "branches") {
      setBranches((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleSave = async () => {
    if (!teacher?._id) return;
    const updatedTeacher = {
      name,
      semesters,
      subjects,
      branches,
    };
    try {
      const data = await updateTeacher(teacher._id, updatedTeacher);
      onEdit(data);
      onClose();
    } catch (error) {
      console.error("Failed to edit teacher:", error);
    }
  };

  const resetForm = () => {
    setName(teacher?.name || "");
    setBranches(teacher?.branches || []);
    setSemesters(teacher?.semesters || []);
    setSubjects(teacher?.subjects || []);
    setBranchInput("");
    setSemesterInput("");
    setSubjectInput("");
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      resetForm();
      onClose();
    }
  };

  const renderList = (
    items: string[],
    type: "semesters" | "subjects" | "branches"
  ) => (
    <div className="flex flex-wrap gap-2 text-sm mt-2">
      {items.map((item) => (
        <div
          key={item}
          className={`${
            theme === "dark" ? "bg-gray-600" : "bg-gray-200"
          } px-2 py-1 rounded flex items-center justify-center gap-1`}>
          {item}
          <button
            onClick={() => handleRemoveItem(type, item)}
            className="text-red-500 hover:text-red-700 font-bold text-lg">
            <X size={24} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium">Semesters</label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Enter semester"
                value={semesterInput}
                onChange={(e) => setSemesterInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddSemester}>
                Add
              </Button>
            </div>
            {renderList(semesters, "semesters")}
          </div>

          <div>
            <label className="block text-sm font-medium">Subjects</label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Enter subject"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddSubject}>
                Add
              </Button>
            </div>
            {renderList(subjects, "subjects")}
          </div>

          <div>
            <label className="block text-sm font-medium">Branches</label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Enter branch"
                value={branchInput}
                onChange={(e) => setBranchInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddBranch}>
                Add
              </Button>
            </div>
            {renderList(branches, "branches")}
          </div>
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button variant="default" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
