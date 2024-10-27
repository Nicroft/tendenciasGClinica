import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAppointment, updateAppointment, getAppointment } from '../api/appointments.api';
import { getAllPatients } from '../api/patients.api';
import { getAllDoctors } from '../api/doctors.api';
import { useNavigate, useParams } from 'react-router-dom';

const AppointmentFormPage = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                date_time: new Date(data.date_time).toISOString(),
                patient: parseInt(data.patient),
                doctor: parseInt(data.doctor)
            };

            if (params.id) {
                await updateAppointment(params.id, payload);
            } else {
                await createAppointment(payload);
            }
            navigate('/appointments');
        } catch (error) {
            console.error("Error saving appointment:", error);
            if (error.response) {
                console.error("Detalles del error:", error.response.data);
            }
        }
    };

    useEffect(() => {
        const loadAppointment = async () => {
            if (params.id) {
                try {
                    const res = await getAppointment(params.id);
                    setValue("date_time", res.data.date_time);
                    setValue("reason", res.data.reason);
                    setValue("status", res.data.status);
                    setValue("patient", res.data.patient);
                    setValue("doctor", res.data.doctor);
                } catch (error) {
                    console.error("Error loading appointment:", error);
                }
            }
        };
        loadAppointment();
    }, [params.id, setValue]);

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const res = await getAllPatients();
                if (Array.isArray(res.data)) {
                    setPatients(res.data);
                } else {
                    console.error("Error: La respuesta de pacientes no es un arreglo:", res.data);
                }
            } catch (error) {
                console.error("Error loading patients:", error);
            }
        };

        const loadDoctors = async () => {
            try {
                const doctorsList = await getAllDoctors();
                setDoctors(doctorsList);
            } catch (error) {
                console.error("Error loading doctors:", error);
            }
        };

        loadPatients();
        loadDoctors();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">{params.id ? 'Editar Cita' : 'Crear Cita'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="date_time" className="block text-sm font-medium text-gray-700">Fecha y Hora:</label>
                    <input
                        type="datetime-local"
                        id="date_time"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("date_time", { required: "La fecha y hora son requeridas." })}
                    />
                    {errors.date_time && <p className="text-red-500 text-xs mt-1">{errors.date_time.message}</p>}
                </div>

                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Razón:</label>
                    <input
                        type="text"
                        id="reason"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("reason", { required: "La razón es requerida." })}
                    />
                    {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado:</label>
                    <select
                        id="status"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("status", { required: "El estado es requerido." })}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Programada">Programada</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                </div>

                <div>
                    <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Paciente:</label>
                    <select
                        id="patient"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("patient", { required: "Seleccione un paciente." })}
                    >
                        <option value="">Seleccione un paciente</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.full_name}
                            </option>
                        ))}
                    </select>
                    {errors.patient && <p className="text-red-500 text-xs mt-1">{errors.patient.message}</p>}
                </div>

                <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Médico:</label>
                    <select
                        id="doctor"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("doctor", { required: "Seleccione un médico." })}
                    >
                        <option value="">Seleccione un médico</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.full_name}
                            </option>
                        ))}
                    </select>
                    {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default AppointmentFormPage;