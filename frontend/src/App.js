import './App.css';
import LoginDecide from './Components/logindecide';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginDoctor from './Components/LoginDoctor';
import PatientHome from './Components/PatientHome';
import DoctorHome from './Components/DoctorHome';
import NewPatient from './Components/NewPatient';
import Displaypatient from './Components/DisplayPatients';
import PatientMedicalRecord from './Components/PatientMedicalRecord';
import PatientNewMedicalRecord from './Components/PatientNewMedicalRecord';
import PatientMedicalRecordList from './Components/PatientMedicalRecordList';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginDecide />}></Route>
        <Route path='/doctorlogin' element={<LoginDoctor />}></Route>
        <Route path='/DoctorHome' element={<DoctorHome />}></Route>
        <Route path='/NewPatient' element={<NewPatient />}></Route>
        <Route path='/DisplayPatient' element={<Displaypatient />}></Route>
        <Route path='/PatientMedicalRecords/:id' element={<PatientMedicalRecord />}></Route>
        <Route path='/PatientMedicalRecordList/:id' element={<PatientMedicalRecordList />}></Route>
        <Route path='/NewPatientMedicalRecord/:id' element={<PatientNewMedicalRecord />}></Route>
        <Route path='/patient' element={<PatientHome />}></Route>

        {/* <Route path='/edit/:rollno' element={<Update />}></Route> */}
      </Routes>
    </BrowserRouter >
  );
}

export default App;
