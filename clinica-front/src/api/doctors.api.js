import axios from 'axios';

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/api/User/'
});


export const getAllDoctors = async () => {
    try {
        const response = await usersApi.get("/");
        console.log(response.data); 

        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error("La respuesta no es un arreglo", response.data);
            return [];
        }
    } catch (error) {
        console.error("Error obteniendo doctores:", error);
        return [];
    }
};