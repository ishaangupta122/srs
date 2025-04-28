import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StarRating } from "./Rating";
import { reviewData } from "@/data/data";
import { NavigateBack } from "./NavigateBack";

export const StudentReviewPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto py-16 px-4 md:px-10">
        <NavigateBack style={"mb-4 text-2xl"} size={30} />
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Student Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviewData.map((item, index) => (
              <div key={item.id}>
                <p className="mb-2 font-medium">
                  Q{index + 1}. {item.question}
                </p>
                <StarRating rating={item.rating} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
