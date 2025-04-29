import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/theme-provider";
import { semesters } from "@/data/data";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export function SemesterCards() {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto py-16 px-4 md:px-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {semesters.map((semester) => (
          <Link to={`/reviews/semester/${semester.sem}`} key={semester.id}>
            <Card className="p-0 hover:shadow-md transition">
              <CardContent className="flex items-center gap-4 p-4">
                {theme === "dark" ? (
                  <>
                    <GraduationCap className="h-20 w-20 text-white" />
                    <div className="text-xl font-semibold">{semester.text}</div>
                  </>
                ) : (
                  <>
                    <GraduationCap className="h-20 w-20 text-[#22C55E]" />
                    <div className="text-[#22C55E] text-xl font-semibold">
                      {semester.text}
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
