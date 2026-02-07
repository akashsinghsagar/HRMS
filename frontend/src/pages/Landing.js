import React from 'react';
import { useNavigate } from 'react-router-dom';
import Iridescence from '../components/Iridescence';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Iridescence
        color={[0.4, 0.5, 0.9]}
        mouseReact
        amplitude={0.15}
        speed={0.8}
      />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HRMS Lite
              </span>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              Login
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600 shadow-md">
                🚀 Modern HR Management System
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Simplify Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                HR Operations
              </span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto">
              Streamline employee management, track attendance, and gain valuable insights with our intuitive HRMS platform. Built for teams who want to focus on what matters most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                onClick={() => navigate('/employees')}
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-bold text-lg shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 font-medium">Free Forever</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Fast
                </div>
                <div className="text-sm text-gray-600 font-medium">Lightning Quick</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Easy
                </div>
                <div className="text-sm text-gray-600 font-medium">Simple to Use</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600">Powerful features to manage your workforce efficiently</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Employee Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Easily add, update, and manage employee records. Keep all important information organized and accessible in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Attendance Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track daily attendance with ease. Mark present, absent, or leave status for all employees with a single click.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Analytics Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Get real-time insights with interactive charts and graphs. Make data-driven decisions for your organization.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Secure & Reliable</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is safe with enterprise-grade security. Hosted on Render with PostgreSQL database backup.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with React and modern technologies for blazing-fast performance. No lag, no waiting, just results.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Responsive Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Access from any device - desktop, tablet, or mobile. Beautiful UI that adapts to your screen size.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of organizations managing their workforce with HRMS Lite. It's free, forever.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Launch Dashboard →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg">
            <p className="text-gray-600 mb-4">
              Built with ❤️ using React, Express, PostgreSQL, and Tailwind CSS
            </p>
            <p className="text-sm text-gray-500">
              © 2026 HRMS Lite. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing;
