import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/theme-provider";
import { departments } from "@/data/data";
import { GraduationCap } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function DepartmentsCards() {
  const { semesterId } = useParams();
  const { theme } = useTheme();

  return (
    <div className="container mx-auto py-16 px-4 md:px-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Link
            to={`/reviews/semester/${semesterId}/department/${department.department}`}
            key={department.id}>
            <Card className="p-0 hover:shadow-md transition">
              <CardContent className="flex items-center gap-4 p-4">
                {theme === "dark" ? (
                  <>
                    <GraduationCap className="h-20 w-20 text-white" />
                    <div className="text-lg font-semibold">
                      {department.text}
                    </div>
                  </>
                ) : (
                  <>
                    <GraduationCap className="h-20 w-20 text-green-700" />
                    <div className="text-green-700 text-lg font-semibold">
                      {department.text}
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
