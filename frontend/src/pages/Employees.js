import React, { useState, useEffect } from 'react';
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from '../services/api';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import './Employees.css';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: 'IT',
  });

  const departments = ['IT', 'HR', 'Finance', 'Operations', 'Sales', 'Marketing', 'Customer Support'];

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      setEmployees(response.data.data || []);
    } catch (error) {
      showAlert('error', 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditingId(employee._id);
      setFormData({
        employeeId: employee.employeeId,
        fullName: employee.fullName,
        email: employee.email,
        department: employee.department,
      });
    } else {
      setEditingId(null);
      setFormData({
        employeeId: '',
        fullName: '',
        email: '',
        department: 'IT',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.employeeId.trim() ||
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.department
    ) {
      showAlert('error', 'All fields are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showAlert('error', 'Invalid email format');
      return;
    }

    try {
      if (editingId) {
        // Update employee
        const response = await updateEmployee(editingId, formData);
        setEmployees((prev) =>
          prev.map((emp) => (emp._id === editingId ? response.data.data : emp))
        );
        showAlert('success', 'Employee updated successfully');
      } else {
        // Create employee
        const response = await createEmployee(formData);
        setEmployees((prev) => [response.data.data, ...prev]);
        showAlert('success', 'Employee created successfully');
      }
      handleCloseModal();
      fetchEmployees(); // Refresh to ensure data is correct
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        'Error saving employee';
      showAlert('error', errorMsg);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      try {
        await deleteEmployee(id);
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        showAlert('success', 'Employee deleted successfully');
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || 'Error deleting employee';
        showAlert('error', errorMsg);
      }
    }
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Employees</div>
            <div className="card-subtitle">
              Total: {employees.length} employees
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal()}
          >
            ➕ Add Employee
          </button>
        </div>

        {/* Search Bar */}
        <div className="form-group mb-4">
          <input
            type="text"
            className="input"
            placeholder="Search by ID, name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Empty State */}
        {!loading && filteredEmployees.length === 0 && searchTerm === '' && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <div className="empty-title">No Employees Yet</div>
            <div className="empty-description">
              Start by adding your first employee to the system.
            </div>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              Add First Employee
            </button>
          </div>
        )}

        {/* No Search Results */}
        {!loading && filteredEmployees.length === 0 && searchTerm !== '' && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">No Results Found</div>
            <div className="empty-description">
              Try adjusting your search criteria.
            </div>
          </div>
        )}

        {/* Employees Table */}
        {!loading && filteredEmployees.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <span className="badge badge-info">{employee.employeeId}</span>
                    </td>
                    <td>{employee.fullName}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {employee.email}
                    </td>
                    <td>{employee.department}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-small"
                        onClick={() => handleOpenModal(employee)}
                        style={{ marginRight: '8px' }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() =>
                          handleDelete(employee._id, employee.fullName)
                        }
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        title={editingId ? 'Edit Employee' : 'Add New Employee'}
        show={showModal}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Employee ID *</label>
            <input
              type="text"
              className="input"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              placeholder="e.g., EMP001"
              disabled={editingId ? true : false}
            />
          </div>

          <div className="form-group">
            <label className="label">Full Name *</label>
            <input
              type="text"
              className="input"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="form-group">
            <label className="label">Email Address *</label>
            <input
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., john@company.com"
            />
          </div>

          <div className="form-group">
            <label className="label">Department *</label>
            <select
              className="select"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Employees;
