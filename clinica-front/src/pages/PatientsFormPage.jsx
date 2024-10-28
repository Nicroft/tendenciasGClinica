import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createPatient, updatePatient, getPatient } from '../api/patients.api';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function PatientsFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        try {
            if (params.id) {
                await updatePatient(params.id, data);
                alert(`Paciente ${data.full_name} actualizado exitosamente`);
            } else {
                await createPatient(data);
                alert(`Paciente ${data.full_name} creado exitosamente`);
            }
            navigate('/patients');
        } catch (error) {
            console.error('Error saving patient:', error);
            alert('Hubo un error al guardar el paciente. Por favor, inténtelo de nuevo.');
        }
    });

    useEffect(() => {
        async function loadPatient() {
            if (params.id) {
                try {
                    const res = await getPatient(params.id);
                    setValue("full_name", res.full_name);
                    setValue("birth_date", res.birth_date);
                    setValue("gender", res.gender);
                    setValue("address", res.address);
                    setValue("phone_number", res.phone_number);
                    setValue("email", res.email);
                    setValue("emergency_contact_name", res.emergency_contact_name);
                    setValue("emergency_contact_phone", res.emergency_contact_phone);
                    setValue("insurance_company", res.insurance_company);
                    setValue("policy_number", res.policy_number);
                    setValue("policy_status", res.policy_status);
                    setValue("policy_expiry", res.policy_expiry);
                } catch (error) {
                    console.error('Error loading patient:', error);
                    alert('Hubo un error al cargar los datos del paciente. Por favor, inténtelo de nuevo.');
                }
            }
        }
        loadPatient();
    }, [params.id, setValue]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Información del Paciente', 14, 20);
        const data = [
            { Label: 'Nombre Completo', Value: getValues("full_name") },
            { Label: 'Fecha de Nacimiento', Value: getValues("birth_date") },
            { Label: 'Género', Value: getValues("gender") },
            { Label: 'Dirección', Value: getValues("address") },
            { Label: 'Número de Teléfono', Value: getValues("phone_number") },
            { Label: 'Correo Electrónico', Value: getValues("email") },
            { Label: 'Contacto de Emergencia', Value: getValues("emergency_contact_name") },
            { Label: 'Teléfono Emergencia', Value: getValues("emergency_contact_phone") },
            { Label: 'Compañía de Seguro', Value: getValues("insurance_company") },
            { Label: 'Número de Póliza', Value: getValues("policy_number") },
            { Label: 'Estado de Póliza', Value: getValues("policy_status") },
            { Label: 'Expiración Póliza', Value: getValues("policy_expiry") },
        ];
        doc.autoTable({
            head: [['Campo', 'Valor']],
            body: data.map(item => [item.Label, item.Value]),
            startY: 30,
        });
        doc.save(`${getValues("full_name") || 'nuevo_paciente'}.pdf`);
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Formulario de Pacientes</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                        type="text"
                        {...register("full_name", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.full_name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        {...register("birth_date", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.birth_date && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Género</label>
                    <select
                        {...register("gender", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        <option value="">Seleccione</option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        type="text"
                        {...register("address", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.address && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                    <input
                        type="tel"
                        {...register("phone_number", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.phone_number && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.email && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Contacto de Emergencia</label>
                    <input
                        type="text"
                        {...register("emergency_contact_name", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.emergency_contact_name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono de Emergencia</label>
                    <input
                        type="tel"
                        {...register("emergency_contact_phone", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.emergency_contact_phone && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Compañía de Seguro</label>
                    <input
                        type="text"
                        {...register("insurance_company", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.insurance_company && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Número de Póliza</label>
                    <input
                        type="text"
                        {...register("policy_number", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.policy_number && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado de Póliza</label>
                    <select
                        {...register("policy_status", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        <option value="">Seleccione</option>
                        <option value="Activa">Activa</option>
                        <option value="Inactiva">Inactiva</option>
                    </select>
                    {errors.policy_status && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Expiración de Póliza</label>
                    <input
                        type="date"
                        {...register("policy_expiry", { required: true })}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.policy_expiry && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-2 rounded mt-4 hover:bg-purple-800"
                >
                    Guardar
                </button>
                <button
                    type="button"
                    onClick={exportToPDF}
                    className="w-full bg-purple-700 text-white py-2 rounded mt-2 hover:bg-purple-800"
                >
                    Exportar a PDF
                </button>
            </form>
        </div>
    );
}