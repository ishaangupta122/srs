import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigateBackProps {
  style?: string;
  size?: number;
}

export const NavigateBack: React.FC<NavigateBackProps> = ({
  style = "",
  size = 25,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className={`cursor-pointer flex items-center ${style}`}>
      <MoveLeft className="mr-2" size={size} />
    </button>
  );
};
