// src/components/Navbar.jsx
export default function Navbar() {
    return (
      <header className="bg-white/20 backdrop-blur-lg shadow-md border-b border-white/20 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Employee Management System</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, Admin 🌟</span>
        </div>
      </header>
    );
  }
  