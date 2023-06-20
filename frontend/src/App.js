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
import { checkAuthLoader } from './util/auth';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';




// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<LoginDecide />}></Route>
//         <Route path='/doctorlogin' element={<LoginDoctor />}  ></Route>
//         <Route path='/DoctorHome' element={<DoctorHome />} loader={checkAuthLoader} ></Route>
//         <Route path='/NewPatient' element={<NewPatient />} loader={checkAuthLoader}></Route>
//         <Route path='/DisplayPatient' element={<Displaypatient />} loader={checkAuthLoader}></Route>
//         <Route path='/PatientMedicalRecords/:id' element={<PatientMedicalRecord />} loader={checkAuthLoader}></Route>
//         <Route path='/PatientMedicalRecordList/:id' element={<PatientMedicalRecordList />}></Route>
//         <Route path='/NewPatientMedicalRecord/:id' element={<PatientNewMedicalRecord />} loader={checkAuthLoader}></Route>
//         <Route path='/patient' element={<PatientHome />}></Route>

//         {/* <Route path='/edit/:rollno' element={<Update />}></Route> */}
//       </Routes>
//     </BrowserRouter >
//   );
// }

const router = createBrowserRouter([
  { path: '/', element: <LoginDecide /> },
  { path: '/doctorlogin', element: <LoginDoctor /> },
  { path: '/DoctorHome', element: <DoctorHome />, loader: checkAuthLoader },
  { path: '/NewPatient', element: <NewPatient />, loader: checkAuthLoader },
  { path: '/DisplayPatient', element: <Displaypatient />, loader: checkAuthLoader },
  { path: '/PatientMedicalRecords/:id', element: <PatientMedicalRecord />, loader: checkAuthLoader },
  { path: '/PatientMedicalRecordList/:id', element: <PatientMedicalRecordList /> },
  { path: '/NewPatientMedicalRecord/:id', element: <PatientNewMedicalRecord />, loader: checkAuthLoader },
  { path: '/patient', element: <PatientHome /> },
])


function App() {
  return <RouterProvider router={router} />
}


export default App;
