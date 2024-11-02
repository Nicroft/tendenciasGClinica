import React, { useEffect, useState } from 'react';
import { getAllAppointments, getPatientById, getDoctorById } from '../api/appointmentslist.api.js';
import { useNavigate } from 'react-router-dom';
import { deleteAppointment } from '../api/appointments.api';
import jsPDF from 'jspdf'; // Importa jsPDF
import 'jspdf-autotable'; // Importa autotable
import './AppointmentsListPage.css';

export function AppointmentsListPage() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAppointments() {
      const response = await getAllAppointments();
      const appointmentsWithDetails = await Promise.all(
        response.data.map(async (appointment) => {
          const patientResponse = await getPatientById(appointment.patient);
          const doctorResponse = await getDoctorById(appointment.doctor);
          
          return {
            ...appointment,
            patient: patientResponse.data,
            doctor: doctorResponse.data,
          };
        })
      );

      setAppointments(appointmentsWithDetails);
    }

    loadAppointments();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
    if (confirmed) {
      try {
        await deleteAppointment(id);
        setAppointments(appointments.filter(appointment => appointment.id !== id));
      } catch (error) {
        console.error("Error eliminando la cita:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/appointments/edit/${id}`);
  };

  // Función para exportar citas a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text("Lista de Citas", 14, 22);

    // Añadir tabla con autotable
    doc.autoTable({
      startY: 30,
      head: [['Fecha y Hora', 'Motivo', 'Estado', 'Paciente', 'Doctor']],
      body: appointments.map((appointment) => [
        new Date(appointment.date_time).toLocaleString(),
        appointment.reason,
        appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1),
        appointment.patient.full_name,
        appointment.doctor.full_name,
      ]),
    });

    // Guardar PDF
    doc.save("citas.pdf");
  };

  return (
    <div className="appointments-container">
      <h1>Appointments List</h1>
      <button className="bg-purple-800 text-white p-2 rounded hover:bg-purple-700" onClick={exportToPDF}>
        Exportar a PDF
      </button>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{new Date(appointment.date_time).toLocaleString()}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</td>
              <td>{appointment.patient.full_name}</td>
              <td>{appointment.doctor.full_name}</td>
              <td>
                <div style={{ display: 'flex', gap: '10px' }}> {/* Usando Flexbox para el espaciado */}
                  <button 
                    className="bg-purple-800 text-white p-2 rounded hover:bg-purple-700" 
                    onClick={() => handleEdit(appointment.id)}
                  >
                    Editar
                  </button>
                  <button 
                    className="bg-purple-800 text-white p-2 rounded hover:bg-purple-700" 
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
