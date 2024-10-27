import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBillings, deleteBilling } from '../api/billingService';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 

const BillingList = () => {
  const [billings, setBillings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBillings = async () => {
      try {
        const data = await fetchBillings();
        setBillings(data);
      } catch (error) {
        console.error('Error al cargar las facturas:', error);
        setError('No se pudieron cargar las facturas.');
      }
    };
    getBillings();
  }, []);

  const handleEdit = (id) => {
    navigate(`/billing/${id}/edit`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta factura?');
    if (confirmDelete) {
      try {
        await deleteBilling(id);
        setBillings((prevBillings) =>
          prevBillings.filter((billing) => billing.id !== id)
        );
      } catch (error) {
        console.error('Error al eliminar la factura:', error);
        setError('No se pudo eliminar la factura.');
      }
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Billing List', 14, 10); 

    const tableColumn = ['Patient', 'Date', 'Amount', 'Payment Status'];
    const tableRows = [];

    billings.forEach((billing) => {
      const billingData = [
        billing.patient_name,
        billing.date,
        billing.amount,
        billing.payment_status,
      ];
      tableRows.push(billingData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('billing_list.pdf'); 
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Billing List
      </h1>
      <div className="flex justify-start mb-4">
        <button
          className="bg-[#7E22CE] text-white px-4 py-2 rounded-md hover:bg-[#6B21A8] transition"
          onClick={exportToPDF}
        >
          Exportar a PDF
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr style={{ backgroundColor: '#544E55' }} className="text-white">
            <th className="border border-gray-300 px-4 py-2">Patient</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Payment Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((billing, index) => (
            <tr
              key={billing.id}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              } hover:bg-gray-200`}
            >
              <td className="border border-gray-300 px-4 py-2">
                {billing.patient_name || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2">{billing.date}</td>
              <td className="border border-gray-300 px-4 py-2">{billing.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                {billing.payment_status}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  onClick={() => handleEdit(billing.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  onClick={() => handleDelete(billing.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingList;
