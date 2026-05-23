import api from "./axios";

export const getUserProgress =
  async () => {
    const response = await api.get(
      "/progress/me"
    );

    return response.data;
  };

export const toggleProgress =
  async (problemId) => {
    const response = await api.post(
      "/progress/toggle",
      {
        problemId,
      }
    );

    return response.data;
  };