import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex justify-between py-3">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/patients"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Patients
          </Link>
        </li>
        <li>
          <Link
            to="/appointments"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Appointments
          </Link>
        </li>
        <li>
          <Link
            to="/patients-create"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Create Patient
          </Link>
        </li>
        <li>
          <Link
            to="/appointments/new"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            New Appointment
          </Link>
        </li>
        <li>
          <Link
            to="/medications"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Medication Inventory
          </Link>
        </li>
        <li>
          <Link
            to="/billing"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Billing
          </Link>
        </li>
        <li>
          <Link
            to="/billing/new"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Create Billing
          </Link>
        </li>
        <li>
          <Link
            to="/users/new"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Create User
          </Link>
        </li>
        <li>
          <Link
            to="/medical-records/new"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Create Medical Record
          </Link>
        </li>
        <li>
          <Link
            to="/medical-records"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Medical Records
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
