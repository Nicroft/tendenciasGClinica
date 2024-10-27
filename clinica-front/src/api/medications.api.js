import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/MedicationInventory/';

export const createMedication = (data) => axios.post(`${BASE_URL}`, data);
export const updateMedication = (id, data) => axios.put(`${BASE_URL}${id}/`, data);
export const getMedication = (id) => axios.get(`${BASE_URL}${id}/`);
export const getAllMedications = () => axios.get(`${BASE_URL}`);
export const deleteMedication = (id) => axios.delete(`${BASE_URL}${id}/`);