import React, { useState, useEffect } from 'react';
import {
  getEmployees,
  getEmployeeAttendance,
  recordAttendance,
  deleteAttendance,
  getAttendance,
} from '../services/api';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import './Attendance.css';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'employee'

  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
    remarks: '',
  });

  // Fetch data on mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [empRes, attRes] = await Promise.all([
        getEmployees(),
        getAttendance(),
      ]);
      setEmployees(empRes.data.data || []);
      setAttendanceRecords(attRes.data.data || []);
      setFilteredRecords(attRes.data.data || []);
    } catch (error) {
      showAlert('error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleOpenModal = () => {
    setFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
      remarks: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

    if (!formData.employeeId || !formData.date || !formData.status) {
      showAlert('error', 'Please fill all required fields');
      return;
    }

    try {
      const response = await recordAttendance(formData);
      setAttendanceRecords((prev) => [response.data.data, ...prev]);
      setFilteredRecords((prev) => [response.data.data, ...prev]);
      showAlert('success', 'Attendance recorded successfully');
      handleCloseModal();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Error recording attendance';
      showAlert('error', errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this attendance record?')) {
      try {
        await deleteAttendance(id);
        setAttendanceRecords((prev) => prev.filter((rec) => rec._id !== id));
        setFilteredRecords((prev) => prev.filter((rec) => rec._id !== id));
        showAlert('success', 'Attendance record deleted');
      } catch (error) {
        showAlert('error', 'Error deleting record');
      }
    }
  };

  const handleFilterByEmployee = async (employeeId) => {
    if (!employeeId) {
      setViewMode('all');
      setFilteredRecords(attendanceRecords);
      return;
    }

    setViewMode('employee');
    setSelectedEmployee(employeeId);
    try {
      const response = await getEmployeeAttendance(employeeId);
      setFilteredRecords(response.data.data || []);
    } catch (error) {
      showAlert('error', 'Failed to fetch employee attendance');
    }
  };

  const handleFilterByDate = (date) => {
    setFilterDate(date);
    if (!date) {
      setFilteredRecords(
        viewMode === 'all'
          ? attendanceRecords
          : attendanceRecords.filter((r) => r.employeeId._id === selectedEmployee)
      );
      return;
    }

    const filtered = attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date).toISOString().split('T')[0];
      const match = recordDate === date;
      if (viewMode === 'employee' && selectedEmployee) {
        return match && record.employeeId._id === selectedEmployee;
      }
      return match;
    });
    setFilteredRecords(filtered);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Present':
        return 'badge-success';
      case 'Absent':
        return 'badge-danger';
      case 'Leave':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  const getTotalStats = () => {
    const present = filteredRecords.filter((r) => r.status === 'Present').length;
    const absent = filteredRecords.filter((r) => r.status === 'Absent').length;
    const leave = filteredRecords.filter((r) => r.status === 'Leave').length;
    return { present, absent, leave };
  };

  const stats = getTotalStats();

  return (
    <div>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-present">✓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.present}</div>
            <div className="stat-label">Present</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-absent">✕</div>
          <div className="stat-content">
            <div className="stat-value">{stats.absent}</div>
            <div className="stat-label">Absent</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-leave">⊕</div>
          <div className="stat-content">
            <div className="stat-value">{stats.leave}</div>
            <div className="stat-label">Leave</div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">Attendance Records</div>
            <div className="card-subtitle">
              Total records: {filteredRecords.length}
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleOpenModal}>
            ➕ Mark Attendance
          </button>
        </div>

        {/* Filters */}
        <div className="filters-grid">
          <div className="form-group">
            <label className="label">Filter by Employee</label>
            <select
              className="select"
              value={selectedEmployee || ''}
              onChange={(e) => handleFilterByEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName} ({emp.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Filter by Date</label>
            <input
              type="date"
              className="input"
              value={filterDate}
              onChange={(e) => handleFilterByDate(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Empty State */}
        {!loading && filteredRecords.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="empty-title">No Attendance Records</div>
            <div className="empty-description">
              Start recording attendance for your employees.
            </div>
            <button className="btn btn-primary" onClick={handleOpenModal}>
              Record First Attendance
            </button>
          </div>
        )}

        {/* Attendance Table */}
        {!loading && filteredRecords.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{record.employeeId?.fullName || 'N/A'}</td>
                    <td>
                      <span className="badge badge-info">
                        {record.employeeId?.employeeId || 'N/A'}
                      </span>
                    </td>
                    <td>{record.employeeId?.department || 'N/A'}</td>
                    <td>
                      {new Date(record.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {record.remarks || '-'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(record._id)}
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
      <Modal title="Mark Attendance" show={showModal} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Employee *</label>
            <select
              className="select"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName} ({emp.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Date *</label>
            <input
              type="date"
              className="input"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="label">Status *</label>
            <select
              className="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Remarks (Optional)</label>
            <textarea
              className="textarea"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Add any remarks or notes..."
            />
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
              Record Attendance
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Attendance;
