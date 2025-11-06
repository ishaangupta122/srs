import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const QUESTIONS_API = `${BASE_URL}/questions`;

const API = axios.create({
  baseURL: QUESTIONS_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all teachers
export const fetchQuestionsList = async (): Promise<any> => {
  try {
    const data = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching questions: \n", error);
    throw error;
  }
};

// Fetch question by ID
export const fetchQuestionById = async (id: string): Promise<any> => {
  try {
    const data = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching question by ID: \n", error);
    throw error;
  }
};

// Add a new teacher
export const addQuestion = async (formData: any): Promise<any> => {
  try {
    const data = await API.post("/", formData);
    return data;
  } catch (error) {
    console.error("Error adding question: \n", error);
    throw error;
  }
};

// Update a teacher
export const updateQuestion = async (
  id: string,
  formData: any
): Promise<any> => {
  try {
    const data = await API.patch(`/${id}`, formData);
    return data;
  } catch (error) {
    console.error(`Error updating question with ID ${id}: \n`, error);
    throw error;
  }
};

// Delete a teacher
export const deleteQuestion = async (id: string): Promise<any> => {
  try {
    const data = await API.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting question: \n", error);
    throw error;
  }
};
