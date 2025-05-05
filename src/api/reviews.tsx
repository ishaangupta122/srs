import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const REVIEWS_URL = `${BASE_URL}/reviews`;

const API = axios.create({
  baseURL: REVIEWS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all reviews
export const fetchAllReviews = async (): Promise<any> => {
  try {
    const data = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching reviews list: \n", error);
    throw error;
  }
};

// Fetch reviews based on teacher, subject and branch
export const fetchTeacherReviews = async (
  teacherId: string | undefined,
  subject: string | undefined,
  branch: string | undefined
): Promise<any> => {
  try {
    const data = await API.get(`/filter`, {
      params: {
        branch,
        subject,
        teacherId,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching teacher's reviews: \n", error);
    throw error;
  }
};
