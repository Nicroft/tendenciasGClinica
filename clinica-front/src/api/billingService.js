const API_URL = 'http://localhost:8000/api/Billing/';

export const fetchBillings = async (id = null) => {
  try {
    const url = id ? `${API_URL}${id}/` : API_URL; 
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo obtener las facturas.`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    throw error;
  }
};

export const createBilling = async (billing) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billing),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo crear la factura.`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear la factura:', error);
    throw error;
  }
};

export const updateBilling = async (id, billing) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billing),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo actualizar la factura.`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar la factura:', error);
    throw error;
  }
};

export const deleteBilling = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo eliminar la factura.`);
    }
  } catch (error) {
    console.error('Error al eliminar la factura:', error);
    throw error;
  }
};
