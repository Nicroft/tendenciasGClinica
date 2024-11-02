import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getAllMedications = () => {
  return axios.get(`${API_BASE_URL}/MedicationInventory/`);
};

export const getMedicationById = (id) => {
  return axios.get(`${API_BASE_URL}/MedicationInventory/${id}/`);
};

export const createMedication = (data) => {
  return axios.post(`${API_BASE_URL}/MedicationInventory/`, data);
};

export const updateMedication = (id, data) => {
  return axios.put(`${API_BASE_URL}/MedicationInventory/${id}/`, data);
};

export const deleteMedication = async (medicationId) => {
  const response = await fetch(`${API_BASE_URL}/MedicationInventory/${medicationId}/`, {
    method: 'DELETE',
  });
  return response.json();
};