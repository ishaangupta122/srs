import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useTheme } from "@/context/theme-provider";
import { UserCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StudentCards } from "@/components/StudentCard";
import Comments from "@/components/Comments";

// Overview Component
const Overview = () => {
  const { teacherId } = useParams();
  const { theme } = useTheme();

  return (
    <Card className="mb-6">
      <CardHeader className="flex items-center gap-5">
        {theme === "dark" ? (
          <UserCircle2 className="h-16 w-16 text-white" />
        ) : (
          <UserCircle2 className="h-16 w-16 text-[#22C55E]" />
        )}
        <div>
          <CardTitle
            className={`text-xl ${
              theme === "dark" ? "text-white" : "text-[#22C55E]"
            }`}>
            {teacherId}
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};

// Reviews Component
const Reviews = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Review Scores</CardTitle>
        <CardDescription>Distribution of review types</CardDescription>
      </CardHeader>
      <CardContent className="max-w-5xl flex flex-col md:flex-row items-center justify-between">
        {/* Pie Chart (Manually Created) */}
        <div className="w-full md:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "Total", value: 120 },
                  { name: "Positive", value: 80.33 },
                  { name: "Moderate", value: 25 },
                  { name: "Negative", value: 15 },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label>
                <Cell fill="#2196f3" /> {/* Total */}
                <Cell fill="#22C55E" /> {/* Positive */}
                <Cell fill="#ff9800" /> {/* Moderate */}
                <Cell fill="#f44336" /> {/* Negative */}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/3 mt-6 md:mt-0 space-y-3">
          <div className="text-lg flex items-center justify-between">
            <span className="font-bold text-[#2196f3]">Total :</span>
            <span className="font-medium">120</span>
          </div>
          <div className="text-lg flex items-center justify-between">
            <span className="font-bold text-[#22C55E]">Positive :</span>
            <span className="font-medium">80.33</span>
          </div>
          <div className="text-lg flex items-center justify-between">
            <span className="font-bold text-[#ff9800]">Moderate :</span>
            <span className="font-medium">25</span>
          </div>
          <div className="text-lg flex items-center justify-between">
            <span className="font-bold text-[#f44336]">Negative :</span>
            <span className="font-medium">15</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Scores Component
const Scores = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Data Analysis</CardTitle>
        <CardDescription>Examination, Theory, Practical Scores</CardDescription>
      </CardHeader>
      <CardContent className="max-w-5xl flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: "Examination", score: 88 },
                { name: "Theory", score: 85 },
                { name: "Practical", score: 90 },
              ]}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Text Fields */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 space-y-3 md:px-5">
          <div className="text-lg flex items-center justify-between">
            <span className="font-bold text-[#22C55E]">Examination :</span>
            <span className="font-medium">120%</span>
          </div>
          <div className="text-lg flex items-center justify-between">
            <span className="font-bold text-[#22C55E]">Theory :</span>
            <span className="font-medium">80.33%</span>
          </div>
          <div className="text-lg flex items-center justify-between">
            <span className="font-bold text-[#22C55E]">Practical :</span>
            <span className="font-medium">25%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// TeacherProfileComponent (Page Content)
const TeacherProfileComponent = () => {
  return (
    <div>
      <Overview />
      <Reviews />
      <Scores />
    </div>
  );
};

// Main Page
export function TeacherProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <TeacherProfileComponent />;
      case "reviews":
        return <StudentCards />;
      case "comments":
        return <Comments />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="container mx-auto px-4 mt-5 md:px-10 md:mt-16">
      {/* Navigation Bar */}
      <div className="flex space-x-4 mb-6">
        <Button
          className="cursor-pointer"
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => setActiveTab("overview")}>
          Overview
        </Button>
        <Button
          className="cursor-pointer"
          variant={activeTab === "reviews" ? "default" : "outline"}
          onClick={() => setActiveTab("reviews")}>
          Reviews
        </Button>
        <Button
          className="cursor-pointer"
          variant={activeTab === "comments" ? "default" : "outline"}
          onClick={() => setActiveTab("comments")}>
          Comments
        </Button>
      </div>

      {/* Render Selected Content */}
      {renderContent()}
    </div>
  );
}
