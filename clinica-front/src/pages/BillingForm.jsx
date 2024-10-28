import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBilling, updateBilling, fetchBillings } from '../api/billingService';

const BillingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient: '',
    date: '',
    amount: '',
    details: '',
    payment_status: 'Pendiente',
  });

  useEffect(() => {
    const loadBilling = async () => {
      if (id) {
        try {
          const billing = await fetchBillings(id); // Cargar factura específica
          setFormData({
            patient: billing.patient || '',
            date: billing.date || '',
            amount: billing.amount || '',
            details: billing.details || '',
            payment_status: billing.payment_status || 'Pendiente',
          });
        } catch (error) {
          console.error('Error al cargar la factura:', error);
        }
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/Patient/');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    loadBilling();
    fetchPatients();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBilling(id, formData);
      } else {
        await createBilling(formData);
      }
      navigate('/billing');
    } catch (error) {
      console.error('Error al guardar la factura:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-semibold mb-6">
          {id ? 'Editar' : 'Nueva'} Factura
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700">Paciente</label>
          <select
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccione un paciente</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.full_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Monto</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Detalles</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Estado de Pago</label>
          <select
            name="payment_status"
            value={formData.payment_status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Pagado">Pagado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-800 transition"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default BillingForm;
