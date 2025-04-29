import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PenSquareIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AddDialog } from "./Add";
import { DeleteDialog } from "./Delete";
import { EditDialog } from "./Edit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";
import { fetchTeachersList } from "@/api/teachers";
import { Teacher } from "@/types/types";

export function TeachersTable() {
  const { theme } = useTheme();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await fetchTeachersList();
      console.log(response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Filtered Teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const query = searchQuery.toLowerCase();

    if (!query) return true;

    const checkIncludes = (arr: string[]) =>
      arr.some((item) => item.toLowerCase().includes(query));

    if (selectedCategory === "Department") {
      return checkIncludes(teacher.branches);
    }

    if (selectedCategory === "Semester") {
      return checkIncludes(teacher.semesters);
    }

    if (selectedCategory === "Subject") {
      return checkIncludes(teacher.subjects);
    }

    // Default: All
    return (
      teacher.name.toLowerCase().includes(query) ||
      checkIncludes(teacher.branches) ||
      checkIncludes(teacher.semesters) ||
      checkIncludes(teacher.subjects)
    );
  });

  // Add Teacher
  const handleAddTeacher = (newTeacher: Teacher) => {
    setTeachers((prev) => [...prev, newTeacher]);
    setAddDialogOpen(false);
  };

  // Edit Teacher
  const handleEditTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher._id === updatedTeacher._id ? updatedTeacher : teacher
      )
    );
    setEditDialogOpen(false);
  };

  // Delete Teacher
  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers((prev) => prev.filter((teacher) => teacher._id !== teacherId));
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-10 py-16">
        <div className="w-full flex flex-col justify-between gap-10">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-3xl font-medium">Teachers Management</h1>
            <button
              className="text-lg font-medium bg-[#22C55E] text-white px-4 py-2 rounded-md transition duration-200 cursor-pointer"
              onClick={() => setAddDialogOpen(true)}>
              Add Teacher
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Input
              placeholder="Search Teachers..."
              className="h-12 placeholder:text-lg bg-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 w-[150px] text-lg cursor-pointer bg-[#22C55E]
                  hover:bg-[#22C55E] text-white hover:text-white">
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className={` ${
                  theme === "dark"
                    ? ""
                    : "bg-[#22C55E] hover:bg-[#22c563] text-white hover:text-white"
                }`}>
                {["All", "Department", "Semester", "Subject"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => setSelectedCategory(item)}
                    className="cursor-pointer text-lg">
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#22C55E]"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="uppercase text-zinc-400">
                  <TableHead>S.No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Semesters</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher, index) => (
                    <TableRow key={teacher._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.subjects.join(", ")}</TableCell>
                      <TableCell>{teacher.semesters.join(", ")}</TableCell>
                      <TableCell>{teacher.branches.join(", ")}</TableCell>
                      <TableCell className="text-right">
                        <div className="space-x-5">
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedTeacher(teacher);
                              setEditDialogOpen(true);
                            }}>
                            <PenSquareIcon className="text-amber-500" />
                          </button>
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedTeacher(teacher);
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
                        No teachers found.
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
          onAdd={handleAddTeacher}
        />

        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onEdit={handleEditTeacher}
          teacher={selectedTeacher}
        />

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={() => handleDeleteTeacher(selectedTeacher?._id || "")}
          teacherId={selectedTeacher?._id}
        />
      </div>
    </>
  );
}
