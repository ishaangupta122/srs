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

// Review Data with colors
const reviewData = [
  { name: "Total", value: 120, color: "#2196f3" },
  { name: "Positive", value: 80.33, color: "#22C55E" },
  { name: "Moderate", value: 25, color: "#ff9800" },
  { name: "Negative", value: 15, color: "#f44336" },
];

// Examination Data
const examData = [
  { name: "Examination", score: 88 },
  { name: "Theory", score: 85 },
  { name: "Practical", score: 90 },
];

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
        <div className="w-full md:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reviewData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label>
                {reviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Text Fields with matching colors */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 space-y-3">
          {reviewData.map((item, index) => (
            <div
              key={index}
              className="text-lg flex items-center justify-between">
              <span className="font-bold" style={{ color: item.color }}>
                {item.name}:
              </span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
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
            <BarChart data={examData}>
              <CartesianGrid strokeDasharray="3 3" />
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
          {examData.map((item, index) => (
            <div
              key={index}
              className="text-lg flex items-center justify-between">
              <span className="font-bold text-[#22C55E]">{item.name}:</span>
              <span className="font-medium">{item.score}</span>
            </div>
          ))}
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
