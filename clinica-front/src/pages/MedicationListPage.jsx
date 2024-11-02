import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMedications, deleteMedication } from '../api/medications.api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MedicationListPage = () => {
    const [medications, setMedications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const res = await getAllMedications();
                setMedications(res.data);
            } catch (error) {
                console.error("Error fetching medications:", error);
            }
        };
        fetchMedications();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteMedication(id);
            setMedications(medications.filter(medication => medication.id !== id));
        } catch (error) {
            console.error("Error deleting medication:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/medications/edit/${id}`);
    };

    const handleAdd = () => {
        navigate('/medications/new');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Medications List', 14, 20);
        const data = medications.map(medication => ({
            Name: medication.name,
            Description: medication.description,
            Quantity: medication.quantity_available,
            Cost: medication.cost,
        }));
        doc.autoTable({
            head: [['Name', 'Description', 'Quantity Available', 'Cost']],
            body: data.map(item => [item.Name, item.Description, item.Quantity, item.Cost]),
            startY: 30,
        });
        doc.save('medications_list.pdf');
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 mb-6 text-center">Medications List</h2>
            <div className="flex justify-between mb-4">
                <button
                    onClick={handleAdd}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add New Medication
                </button>
                <button
                    onClick={exportToPDF}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Export to PDF
                </button>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity Available
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cost
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {medications.map(medication => (
                            <tr key={medication.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{medication.name}</td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{medication.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.quantity_available}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.cost}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(medication.id)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(medication.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicationListPage;