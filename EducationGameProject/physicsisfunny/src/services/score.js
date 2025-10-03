import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';
    
export const addConnection = async ( login, physicsScore, chemistryScore, date ) => {
  try {
    const response = await axios.post(`${API_URL}/Connection/add-connection`, {
      UserName: login,
      PhysicsScore: physicsScore,
      ChemistryScore: chemistryScore,
      ConnectionDate: date
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
