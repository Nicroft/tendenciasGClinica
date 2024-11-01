import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/MedicalRecord/';


export const getAllMedicalRecords = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data; 
    } catch (error) {
        console.error('Error fetching medical records:', error);
        throw error; 
    }
};


export const createMedicalRecord = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data);
        return response.data; 
    } catch (error) {
        console.error('Error creating medical record:', error);
        throw error; 
    }
};


export const updateMedicalRecord = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}${id}/`, data);
        return response.data; 
    } catch (error) {
        console.error('Error updating medical record:', error);
        throw error; 
    }
};


export const getMedicalRecord = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}${id}/`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching medical record:', error);
        throw error; 
    }
};


export const deleteMedicalRecord = async (id) => {
    try {
        await axios.delete(`${BASE_URL}${id}/`); 
    } catch (error) {
        console.error('Error deleting medical record:', error);
        throw error; 
    }
};


export const getPatients = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/Patient/');
        return response.data; 
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error; 
    }
};


export const getDoctors = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/User/');
 
        return response.data.filter(user => user.role === "Médico");
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error; 
    }
};


export const getDoctorsBySpecialty = async (specialty) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/User/');

        return response.data.filter(user => user.role === "Médico" && user.specialty === specialty);
    } catch (error) {
        console.error('Error fetching doctors by specialty:', error);
        throw error; 
    }
};
