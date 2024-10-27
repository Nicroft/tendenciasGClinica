import React from 'react';
import { useForm } from 'react-hook-form';
import { createUser } from '../api/users.api';
import { useNavigate } from 'react-router-dom';

const UserFormPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const payload = {
                email: data.email,
                username: data.username,
                full_name: data.full_name,
                phone_number: data.phone_number,
                birth_date: data.birth_date,
                address: data.address,
                role: data.role,
                password: data.password,
                is_active: data.is_active || false,
                is_admin: data.is_admin || false,
            };

            console.log("Payload de usuario:", payload);

            await createUser(payload);
            navigate('/users');
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.response && error.response.data) {
                console.error("Detalles del error:", error.response.data);
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Crear Usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "El email es requerido" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        {...register("username", { required: "El nombre de usuario es requerido" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                        type="text"
                        {...register("full_name", { required: "El nombre completo es requerido" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                    <input
                        type="tel"
                        {...register("phone_number", { required: "El número de teléfono es requerido" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        {...register("birth_date", { required: "La fecha de nacimiento es requerida" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.birth_date && <p className="text-red-500 text-sm">{errors.birth_date.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        type="text"
                        {...register("address", { required: "La dirección es requerida" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                    <select
                        {...register("role", { required: "El rol es requerido" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="Médico">Médico</option>
                        <option value="Enfermera">Enfermera</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        {...register("password", { required: "La contraseña es requerida" })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input type="checkbox" {...register("is_active")} className="mr-2" />
                        Activo
                    </label>

                    <label className="flex items-center">
                        <input type="checkbox" {...register("is_admin")} className="mr-2" />
                        Administrador
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-2 rounded mt-4 hover:bg-purple-800"
                >
                    Crear Usuario
                </button>
            </form>
        </div>
    );
};

export default UserFormPage;