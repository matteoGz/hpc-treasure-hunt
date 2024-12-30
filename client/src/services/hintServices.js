import axios from './axios';

const BASE_URL = 'http://localhost:8080/api/hints'; // Replace with your actual API endpoint

const getHintsByHuntId = async (huntId) => {
    try {
      const response = await axios.get(`${BASE_URL}ByHuntId/${huntId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hint:', error);
      throw error; // Re-throw for error handling in the component
    }
};

const getHintByHuntIdAndHintNumber = async (huntId, hintNumber) => {
    try {
      const response = await axios.get(`${BASE_URL}ByHuntId/${huntId}/${hintNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hint:', error);
      throw error; // Re-throw for error handling in the component
    }
};

const createHint = async (hintData) => {
    try {
      const response = await axios.post(BASE_URL, hintData);
      return response.data;
    } catch (error) {
      console.error('Error creating hint:', error);
      throw error; // Re-throw for error handling in the component
    }
};

const deleteHint = async (hintId) => {
    try {
      await axios.delete(`${BASE_URL}/${hintId}`);
    } catch (error) {
      console.error('Error deleting hint:', error);
      throw error; // Re-throw for error handling in the component
    }
};

export { getHintsByHuntId, getHintByHuntIdAndHintNumber, createHint, deleteHint };