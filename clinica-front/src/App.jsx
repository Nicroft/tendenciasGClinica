import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PatientsPage } from './pages/PatientsPage';
import { PatientsFormPage } from './pages/PatientsFormPage';
import { AppointmentsListPage } from './pages/AppointmentsListPage';
import BillingList from './pages/BillingList';
import BillingForm from './pages/BillingForm';
import MedicationInventoryFormPage from './pages/MedicationInventoryFormPage';
import MedicationListPage from './pages/MedicationListPage';
import AppointmentFormPage from './pages/AppointmentFormPage'; 
import Navigation from './components/Navigation'; 
import UserFormPage from './pages/UserFormPage';
import MedicalRecordListPage from './pages/MedicalRecordListPage';
import MedicalRecordFormPage from './pages/MedicalRecordFormPage'; 

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/patients" />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients-create" element={<PatientsFormPage />} />
          <Route path="/patients/:id" element={<PatientsFormPage />} />
          <Route path="/appointments/new" element={<AppointmentFormPage />} />
          <Route path="/appointments" element={<AppointmentsListPage />} />
          <Route path="/appointments/edit/:id" element={<AppointmentFormPage />} />
          <Route path="/billing" element={<BillingList />} />
          <Route path="/billing/new" element={<BillingForm />} />
          <Route path="/billing/:id/edit" element={<BillingForm />} />
          <Route path="/medications" element={<MedicationListPage />} />
          <Route path="/medications/new" element={<MedicationInventoryFormPage />} />
          <Route path="/medications/edit/:id" element={<MedicationInventoryFormPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/medical-records" element={<MedicalRecordListPage />} />
          <Route path="/medical-records/new" element={<MedicalRecordFormPage />} />
          <Route path="/medical-records/edit/:id" element={<MedicalRecordFormPage />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;