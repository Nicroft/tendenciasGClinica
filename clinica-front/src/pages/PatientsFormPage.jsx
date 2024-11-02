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

    const onSubmit = handleSubmit(async (data) => {
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
                console.log("Cargando paciente con ID:", params.id); // Verificar ID
                try {
                    const res = await getPatient(params.id);
                    if (res && res.data) {
                        console.log("Paciente cargado:", res.data); // Verificar datos obtenidos
                        for (const [key, value] of Object.entries(res.data)) {
                            setValue(key, value);
                        }
                    } else {
                        alert('No se encontró el paciente con el ID especificado.');
                    }
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
            { Label: 'Nombre Completo', Value: getValues("full_name") || "N/A" },
            { Label: 'Fecha de Nacimiento', Value: getValues("birth_date") || "N/A" },
            { Label: 'Género', Value: getValues("gender") || "N/A" },
            { Label: 'Dirección', Value: getValues("address") || "N/A" },
            { Label: 'Número de Teléfono', Value: getValues("phone_number") || "N/A" },
            { Label: 'Correo Electrónico', Value: getValues("email") || "N/A" },
            { Label: 'Contacto de Emergencia', Value: getValues("emergency_contact_name") || "N/A" },
            { Label: 'Teléfono Emergencia', Value: getValues("emergency_contact_phone") || "N/A" },
            { Label: 'Compañía de Seguro', Value: getValues("insurance_company") || "N/A" },
            { Label: 'Número de Póliza', Value: getValues("policy_number") || "N/A" },
            { Label: 'Estado de Póliza', Value: getValues("policy_status") || "N/A" },
            { Label: 'Expiración Póliza', Value: getValues("policy_expiry") || "N/A" },
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
                {[
                    { label: 'Nombre Completo', name: 'full_name', type: 'text' },
                    { label: 'Fecha de Nacimiento', name: 'birth_date', type: 'date' },
                    { label: 'Dirección', name: 'address', type: 'text' },
                    { label: 'Número de Teléfono', name: 'phone_number', type: 'tel' },
                    { label: 'Correo Electrónico', name: 'email', type: 'email' },
                    { label: 'Contacto de Emergencia', name: 'emergency_contact_name', type: 'text' },
                    { label: 'Teléfono de Emergencia', name: 'emergency_contact_phone', type: 'tel' },
                    { label: 'Compañía de Seguro', name: 'insurance_company', type: 'text' },
                    { label: 'Número de Póliza', name: 'policy_number', type: 'text' },
                    { label: 'Expiración de Póliza', name: 'policy_expiry', type: 'date' }
                ].map((field, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                        <input
                            type={field.type}
                            {...register(field.name, { required: true })}
                            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        {errors[field.name] && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                    </div>
                ))}

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
