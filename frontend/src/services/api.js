import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee APIs
export const getEmployees = () => apiClient.get('/employees');
export const getEmployee = (id) => apiClient.get(`/employees/${id}`);
export const createEmployee = (data) => apiClient.post('/employees', data);
export const updateEmployee = (id, data) => apiClient.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => apiClient.delete(`/employees/${id}`);

// Attendance APIs
export const getAttendance = () => apiClient.get('/attendance');
export const getEmployeeAttendance = (employeeId) => apiClient.get(`/attendance/employee/${employeeId}`);
export const recordAttendance = (data) => apiClient.post('/attendance', data);
export const updateAttendance = (id, data) => apiClient.put(`/attendance/${id}`, data);
export const deleteAttendance = (id) => apiClient.delete(`/attendance/${id}`);
export const getAttendanceSummary = (employeeId) => apiClient.get(`/attendance/summary/${employeeId}`);

export default apiClient;
