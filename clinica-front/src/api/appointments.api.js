import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/Appointment/';

export const getAllAppointments = () => axios.get(BASE_URL);
export const createAppointment = (data) => axios.post(BASE_URL, data);
export const updateAppointment = (id, data) => axios.put(`${BASE_URL}${id}/`, data);
export const deleteAppointment = (id) => axios.delete(`${BASE_URL}${id}/`); 
export const getAppointment = (id) => axios.get(`${BASE_URL}${id}/`);
