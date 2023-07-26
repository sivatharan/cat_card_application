import axios from "axios";
export const get = async (url, options) => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
