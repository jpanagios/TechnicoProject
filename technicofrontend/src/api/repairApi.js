import api from './axios';

export const getRepairs = async () => {
    const response = await api.get('/Repair');
    return response.data;
};

export const createRepair = async (repair) => {
    const response = await api.post('/Repair', repair);
    return response.data;
};

export const updateRepair = async (repair) => {
    const response = await api.put(`/Repair/${repair.id}`, repair);
    return response.data;
};

export const deleteRepair = async (id) => {
    await api.delete(`/Repair/${id}`);
};
