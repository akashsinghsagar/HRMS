import React, { useState, useEffect } from 'react';
import {
  getEmployees,
  getAttendance,
} from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Iridescence from '../components/Iridescence';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [empRes, attRes] = await Promise.all([
        getEmployees(),
        getAttendance(),
      ]);
      setEmployees(empRes.data.data || []);
      setAttendance(attRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendance.filter(
      (record) => new Date(record.date).toISOString().split('T')[0] === today
    );

    return {
      present: todayRecords.filter((r) => r.status === 'Present').length,
      absent: todayRecords.filter((r) => r.status === 'Absent').length,
      leave: todayRecords.filter((r) => r.status === 'Leave').length,
      total: todayRecords.length,
    };
  };

  const getRecentAttendance = () => {
    return attendance.slice(0, 10);
  };

  // Chart data preparation
  const getLast7DaysAttendance = () => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }

    const presentData = [];
    const absentData = [];
    const leaveData = [];

    last7Days.forEach(date => {
      const dayRecords = attendance.filter(r => 
        new Date(r.date).toISOString().split('T')[0] === date
      );
      presentData.push(dayRecords.filter(r => r.status === 'Present').length);
      absentData.push(dayRecords.filter(r => r.status === 'Absent').length);
      leaveData.push(dayRecords.filter(r => r.status === 'Leave').length);
    });

    return {
      labels: last7Days.map(date => new Date(date).toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric' 
      })),
      datasets: [
        {
          label: 'Present',
          data: presentData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Absent',
          data: absentData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Leave',
          data: leaveData,
          borderColor: 'rgb(251, 146, 60)',
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          tension: 0.4,
        },
      ],
    };
  };

  const getStatusDistribution = () => {
    const present = attendance.filter(r => r.status === 'Present').length;
    const absent = attendance.filter(r => r.status === 'Absent').length;
    const leave = attendance.filter(r => r.status === 'Leave').length;

    return {
      labels: ['Present', 'Absent', 'Leave'],
      datasets: [
        {
          data: [present, absent, leave],
          backgroundColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)', 'rgb(251, 146, 60)'],
          borderColor: ['rgb(21, 128, 61)', 'rgb(185, 28, 28)', 'rgb(194, 65, 12)'],
          borderWidth: 2,
        },
      ],
    };
  };

  const getDepartmentChartData = () => {
    const deptStats = getDepartmentStats();
    return {
      labels: deptStats.map(d => d.name),
      datasets: [
        {
          data: deptStats.map(d => d.count),
          backgroundColor: [
            'rgb(59, 130, 246)',
            'rgb(34, 197, 94)',
            'rgb(251, 146, 60)',
            'rgb(239, 68, 68)',
            'rgb(168, 85, 247)',
            'rgb(236, 72, 153)',
            'rgb(6, 182, 212)',
          ],
          borderColor: 'rgb(255, 255, 255)',
          borderWidth: 2,
        },
      ],
    };
  };

  const getAttendanceRateByDept = () => {
    const deptStats = {};
    
    employees.forEach(emp => {
      if (!deptStats[emp.department]) {
        deptStats[emp.department] = { total: 0, present: 0 };
      }
      deptStats[emp.department].total++;
    });

    attendance.forEach(record => {
      const dept = record.employeeId?.department;
      if (dept && deptStats[dept] && record.status === 'Present') {
        deptStats[dept].present++;
      }
    });

    const labels = Object.keys(deptStats);
    const rates = labels.map(dept => {
      const total = deptStats[dept].total * 7;
      return total > 0 ? ((deptStats[dept].present / total) * 100).toFixed(1) : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Attendance Rate (%)',
          data: rates,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 },
        },
      },
    },
  };

  const todayStats = getTodayStats();
  const recentAttendance = getRecentAttendance();

  function getDepartmentStats() {
    const depts = {};
    employees.forEach((emp) => {
      depts[emp.department] = (depts[emp.department] || 0) + 1;
    });
    return Object.entries(depts).map(([name, count]) => ({
      name,
      count,
    }));
  }

  function getStatusBadge(status) {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Leave':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative w-full min-h-screen">
      <Iridescence
        color={[0.5, 0.6, 0.8]}
        mouseReact
        amplitude={0.1}
        speed={1}
      />
      
      <div className="relative z-10 w-full p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-6 border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{employees.length}</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">👥</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-100">
              <span className="text-xs text-blue-600 font-medium">Active Workforce</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-6 border border-green-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{todayStats.present}</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">✓</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-100">
              <span className="text-xs text-green-600 font-medium">In Office</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-6 border border-red-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent Today</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{todayStats.absent}</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">✕</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-100">
              <span className="text-xs text-red-600 font-medium">Not Present</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-6 border border-orange-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Leave Today</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{todayStats.leave}</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">⊕</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-orange-100">
              <span className="text-xs text-orange-600 font-medium">Approved Leave</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Attendance Trends</h3>
              <p className="text-sm text-gray-500 mt-1">Last 7 days performance</p>
            </div>
            <div className="h-64 sm:h-72">
              {attendance.length > 0 ? (
                <Line data={getLast7DaysAttendance()} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No attendance data available
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Status Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">Overall breakdown</p>
            </div>
            <div className="h-64 sm:h-72">
              {attendance.length > 0 ? (
                <Doughnut data={getStatusDistribution()} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No attendance data available
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Department Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">Employees by department</p>
            </div>
            <div className="h-64 sm:h-72">
              {employees.length > 0 ? (
                <Pie data={getDepartmentChartData()} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No employee data available
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Attendance Rate by Department</h3>
              <p className="text-sm text-gray-500 mt-1">Percentage</p>
            </div>
            <div className="h-64 sm:h-72">
              {employees.length > 0 && attendance.length > 0 ? (
                <Bar data={getAttendanceRateByDept()} options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Attendance Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Recent Attendance Records</h3>
            <p className="text-sm text-gray-500 mt-1">Latest 10 entries</p>
          </div>

          {recentAttendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-100">
                  {recentAttendance.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.employeeId?.fullName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {record.employeeId?.department || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Attendance Records Yet</h4>
              <p className="text-sm text-gray-500">Start tracking attendance to see records here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
