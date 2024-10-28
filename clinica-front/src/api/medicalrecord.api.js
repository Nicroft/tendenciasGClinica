import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/MedicalRecord/';

// Función para obtener todos los registros médicos
export const getAllMedicalRecords = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data; // Retorna los datos directamente
    } catch (error) {
        console.error('Error fetching medical records:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para crear un nuevo registro médico
export const createMedicalRecord = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data);
        return response.data; // Retorna el nuevo registro creado
    } catch (error) {
        console.error('Error creating medical record:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para actualizar un registro médico
export const updateMedicalRecord = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}${id}/`, data);
        return response.data; // Retorna el registro actualizado
    } catch (error) {
        console.error('Error updating medical record:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para obtener un registro médico específico
export const getMedicalRecord = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}${id}/`);
        return response.data; // Retorna el registro médico específico
    } catch (error) {
        console.error('Error fetching medical record:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para eliminar un registro médico
export const deleteMedicalRecord = async (id) => {
    try {
        await axios.delete(`${BASE_URL}${id}/`); // Elimina un registro médico por ID
    } catch (error) {
        console.error('Error deleting medical record:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para obtener todos los pacientes
export const getPatients = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/Patient/');
        return response.data; // Retorna todos los pacientes
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para obtener solo los médicos
export const getDoctors = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/User/');
        // Filtrar solo los usuarios que son médicos
        return response.data.filter(user => user.role === "Médico");
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para obtener médicos por especialidad (opcional)
export const getDoctorsBySpecialty = async (specialty) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/User/');
        // Filtrar médicos por especialidad
        return response.data.filter(user => user.role === "Médico" && user.specialty === specialty);
    } catch (error) {
        console.error('Error fetching doctors by specialty:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
