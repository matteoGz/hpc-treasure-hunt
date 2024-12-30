import axios from './axios';

const BASE_URL = 'http://localhost:8080/api/hunts'; // Replace with your actual API endpoint

const getAllHunts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching hunts:', error);
    throw error; // Re-throw for error handling in the component
  }
};

const getHuntById = async (huntId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${huntId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hunt:', error);
    throw error; // Re-throw for error handling in the component
  }
};

const joinHuntByJoinCode = async (joinCode, userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/join/${joinCode}`, userId);
      return response.data;
    } catch (error) {
      console.error('Error joining hunt:', error);
      throw error; // Re-throw for error handling in the component
    }
};

const createHunt = async (huntData) => {
  try {
    const response = await axios.post(BASE_URL, huntData);
    return response.data;
  } catch (error) {
    console.error('Error creating hunt:', error);
    throw error; // Re-throw for error handling in the component
  }
};

const updateHunt = async (huntId, updatedHuntData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${huntId}`, updatedHuntData);
    return response.data;
  } catch (error) {
    console.error('Error updating hunt:', error);
    throw error; // Re-throw for error handling in the component
  }
};

const deleteHunt = async (huntId) => {
  try {
    await axios.delete(`${BASE_URL}/${huntId}`);
  } catch (error) {
    console.error('Error deleting hunt:', error);
    throw error; // Re-throw for error handling in the component
  }
};

export { getAllHunts, getHuntById, createHunt, updateHunt, deleteHunt, joinHuntByJoinCode };