import axios from 'axios';

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/api/User/'
});

// Obtener todos los doctores
export const getAllDoctors = () => {
    return usersApi.get("/").then(response => {
        return response.data.filter(user => user.role === "Médico");
    });
};


export const createUser = (userData) => {
    return usersApi.post("/", userData);
};
