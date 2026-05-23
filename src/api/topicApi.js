import api from "./axios";

export const getTopics = async () => {
  const response = await api.get(
    "/topics"
  );

  return response.data;
};

export const getProblemsByTopic =
  async (topicId) => {
    const response = await api.get(
      `/topics/${topicId}/problems`
    );

    return response.data;
  };