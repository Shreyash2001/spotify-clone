import { create } from "zustand";
import axios from "axios";
import { BASE_API_URL } from "../utils/utility";

export const useDataStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,

  getData: async () => {
    set({ isLoading: true, error: null });
    try {
      //   const { data } = await axios.get(`${BASE_API_URL}/api/data`);
      const data = {
        title: "Made for Test User",
        data: [
          {
            id: 1,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1647647699992-4f7489c236ca?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 2,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 3,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 4,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 5,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 6,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1524567248408-cbfd37e65e2d?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 7,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://plus.unsplash.com/premium_photo-1723291298782-20d65301568e?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 8,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1518893883800-45cd0954574b?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 9,
            title: "Diljeet Top Mix",
            description: "efwv wefygweyf ewgfwe wefyggwey wefgwgef",
            image:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
      };
      set({ data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch data",
        isLoading: false,
      });
    }
  },
}));
