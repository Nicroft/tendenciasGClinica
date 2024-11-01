import axios from 'axios';

const patientsApi = axios.create({
    baseURL: 'http://localhost:8000/api/Patient/'
});

export const getAllPatients = () => patientsApi.get("/");

export const getPatient = (id) => patientsApi.get(`/${id}/`);

export const createPatient = (patient) => patientsApi.post("/", patient);

export const deletePatient = (id) => patientsApi.delete(`/${id}/`);

export const updatePatient = (id, patient) => patientsApi.put(`/${id}/`, patient);
