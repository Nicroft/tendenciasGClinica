import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getMedication, createMedication, updateMedication } from '../api/medications.api';

const MedicationInventoryFormPage = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const loadMedication = async () => {
                try {
                    const res = await getMedication(id);
                    setValue("name", res.data.name);
                    setValue("description", res.data.description);
                    setValue("quantity_available", res.data.quantity_available);
                    setValue("cost", res.data.cost);
                } catch (error) {
                    console.error("Error loading medication:", error);
                }
            };
            loadMedication();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            if (id) {
                await updateMedication(id, data);
            } else {
                await createMedication(data);
            }
            navigate('/medications');
        } catch (error) {
            console.error("Error saving medication:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Medication' : 'Add Medication'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("name", { required: "Name is required." })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("description")}
                    />
                </div>

                <div>
                    <label htmlFor="quantity_available" className="block text-sm font-medium text-gray-700">Quantity Available:</label>
                    <input
                        type="number"
                        id="quantity_available"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("quantity_available", { required: "Quantity is required." })}
                    />
                    {errors.quantity_available && <p className="text-red-500 text-xs mt-1">{errors.quantity_available.message}</p>}
                </div>

                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="cost"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("cost", { required: "Cost is required." })}
                    />
                    {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default MedicationInventoryFormPage;