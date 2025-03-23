import axios from "axios";

const API_URL = "http://localhost:8000"; 

// 🔹 Login API
export const loginUser = async (credentials: { username: string; password: string }) => {
  const params = new URLSearchParams();
  Object.entries(credentials).forEach(([key, value]) => params.append(key, value));

  const response = await axios.post(`${API_URL}/auth/token`, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

// 🔹 Register API
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

// 🔹 Fetch User Profile
export const fetchUserProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/users/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export interface WeeklyAssessmentResponse {
  coping_strategies: number;
  appetite: number;
  relationships: number;
  energy: number;
  sleep: number;
  mood: string;
  overall_score: number;
  improvement_suggestion: string;
  created_at: string; // New timestamp field returned by backend
}

// 🔹 Submit Weekly Assessment (Sends username as user_id)
export async function submitWeeklyAssessment(
  userId: string,
  token: string,
  answers: any
) {
  // Build payload matching the backend schema:
  const payload = {
    user_id: userId, // using the username as user_id
    coping_strategies: Number(answers.coping_strategies),
    appetite: Number(answers.appetite),
    relationships: Number(answers.relationships),
    energy: Number(answers.energy),
    sleep: Number(answers.sleep),
    mood_description: answers.mood_description,
  };

  // If your backend router is included with a prefix (e.g., "/api"), adjust the URL accordingly.
  const response = await fetch(`${API_URL}/api/weekly-assessment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error submitting assessment: ${response.statusText}`);
  }
  return response.json();
}

// 🔹 Fetch Weekly History (Requires user_id & token)
export const fetchWeeklyHistory = async (user_id: string, token: string) => {
  const response = await axios.get(`${API_URL}/api/weekly-report/`, {
    params: { user_id },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export async function sendChatMessage(message: string, conversationId: string) {
  const response = await fetch("http://localhost:8000/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
    }),
  });

  if (!response.ok) {
    throw new Error("Error with API request");
  }

  const data = await response.json();
  return data;
}
