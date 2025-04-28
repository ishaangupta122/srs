import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/theme-provider";
import { teachers } from "@/data/data";
import { UserCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function TeacherCards() {
  const { semesterId, departmentId } = useParams();
  const { theme } = useTheme();

  return (
    <div className="container mx-auto py-16 px-4 md:px-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <Link
            to={`/reviews/semester/${semesterId}/department/${departmentId}/teacher/${teacher.name}`}
            key={teacher.id}>
            <Card className="p-0 hover:shadow-md transition">
              <CardContent className="flex items-center gap-4 p-4">
                {theme === "dark" ? (
                  <>
                    <UserCircle2 className="h-20 w-20 text-white" />
                    <div className="text-lg font-semibold">{teacher.name}</div>
                  </>
                ) : (
                  <>
                    <UserCircle2 className="h-20 w-20 text-green-700" />
                    <div className="text-green-700 text-lg font-semibold">
                      {teacher.name}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
