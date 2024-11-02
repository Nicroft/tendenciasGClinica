import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMedicalRecords, deleteMedicalRecord } from '../api/medicalrecord.api';
import { getDoctors, getPatients } from '../api/medicalrecord.api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './MedicalRecordListPage.css'; // Asegúrate de tener este archivo CSS

const MedicalRecordListPage = () => {
    const [records, setRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const medicalRecords = await getAllMedicalRecords();
                setRecords(medicalRecords);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        };

        const fetchPatientsAndDoctors = async () => {
            try {
                const patientData = await getPatients();
                const doctorData = await getDoctors();
                setPatients(patientData);
                setDoctors(doctorData);
            } catch (error) {
                console.error('Error fetching patients or doctors:', error);
            }
        };

        fetchRecords();
        fetchPatientsAndDoctors();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            try {
                await deleteMedicalRecord(id);
                setRecords(records.filter((record) => record.id !== id));
                alert('Registro eliminado exitosamente.');
            } catch (error) {
                console.error('Error deleting medical record:', error);
            }
        }
    };

    const getPatientNameById = (id) => {
        const patient = patients.find((patient) => patient.id === id);
        return patient ? patient.full_name : 'No disponible';
    };

    const getDoctorNameById = (id) => {
        const doctor = doctors.find((doctor) => doctor.id === id);
        return doctor ? doctor.full_name : 'No disponible';
    };

    const handleEdit = (id) => {
        navigate(`/medical-records/edit/${id}`);
    };

    const exportPatientPDF = (record) => {
        const doc = new jsPDF();
        doc.text(`Historia Clínica - ${getPatientNameById(record.patient)}`, 14, 16);
        doc.autoTable({
            head: [['Fecha', 'Descripción', 'Paciente', 'Médico']],
            body: [
                [
                    record.date,
                    record.description,
                    getPatientNameById(record.patient),
                    getDoctorNameById(record.doctor),
                ],
            ],
            startY: 20,
        });
        doc.save(`historia_clinica_${getPatientNameById(record.patient)}.pdf`);
    };

    return (
        <div className="container">
            <h2 className="title">Lista de Historias Clínicas</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="records-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Paciente</th>
                        <th>Médico</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {records
                        .filter((record) =>
                            record.description.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((record) => (
                            <tr key={record.id}>
                                <td>{record.date}</td>
                                <td>{record.description}</td>
                                <td>{getPatientNameById(record.patient)}</td>
                                <td>{getDoctorNameById(record.doctor)}</td>
                                <td className="actions-cell">
                                    <button
                                        onClick={() => handleEdit(record.id)}
                                        className="edit-button"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className="delete-button"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => exportPatientPDF(record)}
                                        className="export-button"
                                    >
                                        Exportar PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalRecordListPage;
