import { create } from "zustand";
import axios from "axios";
import { BASE_API_URL } from "../utils/utility";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,

  signup: async (formData) => {
    formData.dob = `${formData.day}-${formData.month}-${formData.year}`;
    console.log(formData);
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/api/auth/signup`,
        formData
      );
      const { accessToken, refreshToken } = data;
      setTimeout(() => {
        set({
          user: formData,
          accessToken,
          refreshToken,
          isLoading: false,
        });
      }, 1000);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      setTimeout(() => {
        set({
          error:
            error.response?.data?.message || "Signup Failed. Please try again",
          isLoading: false,
        });
      }, 1000);
    }
  },
  login: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post("/api/auth/login", formData);
      const { accessToken, refreshToken } = data;
      set({
        accessToken,
        refreshToken,
        isLoading: false,
      });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Login Failed. Please try again",
        isLoading: false,
      });
    }
  },
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
