import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllMedicalRecords, createMedicalRecord, updateMedicalRecord, getPatients, getDoctors } from '../api/medicalrecord.api';

const MedicalRecordFormPage = () => {
    const { id } = useParams(); // Obtener el parámetro id de la URL
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        date: '',
        description: '',
        patient: '',
        doctor: '',
    });
    const isEditing = Boolean(id); // Asumiendo que el ID se pasa como un parámetro en la URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await getAllMedicalRecords();
                setMedicalRecords(records);

                const patientData = await getPatients();
                setPatients(patientData);

                const doctorData = await getDoctors();
                setDoctors(doctorData);

                if (isEditing) {
                    const recordToEdit = records.find(record => record.id === Number(id));
                    if (recordToEdit) {
                        setFormData(recordToEdit);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [isEditing, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateMedicalRecord(formData.id, formData);
                alert("Registro médico actualizado con éxito");
            } else {
                await createMedicalRecord(formData);
                alert("Registro médico creado con éxito");
            }
            // Reiniciar el formulario después de guardar
            setFormData({ id: null, date: '', description: '', patient: '', doctor: '' });
            // Refrescar los registros médicos
            const updatedRecords = await getAllMedicalRecords();
            setMedicalRecords(updatedRecords);
        } catch (error) {
            console.error("Error saving medical record:", error);
            alert("Hubo un error al guardar el registro médico");
        }
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: '#333',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{isEditing ? "Editar Registro Médico" : "Crear Registro Médico"}</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Fecha:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Descripción:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={styles.textarea}
                        />
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Paciente:
                        <select
                            name="patient"
                            value={formData.patient}
                            onChange={handleChange}
                            required
                            style={styles.select}
                        >
                            <option value="" disabled>Select a patient</option>
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>{patient.full_name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Doctor:
                        <select
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            required
                            style={styles.select}
                        >
                            <option value="" disabled>Select a doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit" style={styles.button}>{isEditing ? "Actualizar" : "Crear"}</button>
            </form>
        </div>
    );
};

export default MedicalRecordFormPage;