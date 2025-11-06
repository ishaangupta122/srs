import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StarRating } from "./Rating";
import { NavigateBack } from "./NavigateBack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/api/eda";

// Define Review interface
interface Review {
  student: string;
  question: string;
  rating: number;
  id: string;
}

export const StudentReviewPage: React.FC = () => {
  const { departmentId, semester, teacherId, studentId } = useParams();
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch reviews and questions data from API
  const fetchReviewsAndQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      // Fetch reviews and questions concurrently
      const [reviewRes, questionRes] = await Promise.all([
        fetch(
          `${BASE_URL}/reviews/filterReview?branch=${departmentId}&subject=${semester}&teacherId=${teacherId}&studentId=${studentId}`
        ),
        fetch(`${BASE_URL}/questions`),
      ]);

      if (!reviewRes.ok) throw new Error("Failed to fetch reviews");
      if (!questionRes.ok) throw new Error("Failed to fetch questions");

      // Parse the JSON responses
      const reviewData = await reviewRes.json();
      const questionData = await questionRes.json();

      console.log("Review Data: ", reviewData); // Log to check API response

      // Map questions to an array for transforming the review data
      const questions: string[] = questionData.map((q: any) => q.question);

      // Transform the review data with proper structure
      const transformed: Review[] = reviewData.flatMap((entry: any) =>
        entry.ratings.map((r: any, idx: number) => ({
          student: entry.studentId,
          question: questions[idx] || `Rating ${idx + 1}`,
          rating: r.rating,
          id: r._id,
        }))
      );

      setReviewData(transformed); // Set transformed data to state
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or params change
  useEffect(() => {
    fetchReviewsAndQuestions();
  }, [departmentId, semester, teacherId, studentId]);

  return (
    <div>
      <div className="container mx-auto py-16 px-4 md:px-10">
        <NavigateBack style={"mb-4 text-2xl"} size={30} />
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Student Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Loading State */}
            {loading && <p>Loading reviews...</p>}

            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* No Reviews Found */}
            {!loading && !error && reviewData.length === 0 && (
              <p>No reviews found.</p>
            )}

            {/* Display Reviews */}
            {!loading && !error && reviewData.length > 0 && (
              reviewData.map((item, index) => (
                <div key={item.id || index}>
                  <p className="mb-2 font-medium">
                    Q{index + 1}. {item.question}
                  </p>
                  <StarRating rating={item.rating} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
