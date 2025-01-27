import './App.css';
import '../src/styles/styles.css';
import { Routes, Route } from 'react-router-dom';
import AuthorizationPage from './components/pages/AuthorizationPage';
import RegistrationPage from './components/pages/RegistrationPage';
import MainSearchPage from './components/pages/MainSearchPage';
import CargoForm from './components/forms/CargoForm';
import AutoForm from './components/forms/AutoForm';
import CargoPostPage from './components/pages/cargoPages/CagroPostPage';
import AutoPostPage from './components/pages/autoPages/AutoPostPage';
import CargoListPage from './components/pages/cargoPages/CargoListPage';
import AutoListPage from './components/pages/autoPages/AutoListPage';
import Popup from './components/Popup';
import DriverForm from './components/forms/DriverForm';
import DriverPostPage from './components/pages/driverPages/DriverPostPage';


function App() {
// const text = {number: 88005553535, company: 88005553535, address: 88005553535};

  return (
    <div className="app">
      {/* <TopBar /> */}
      {/* <RegistrationPage />
      <AuthorizationPage /> */}
      {/* <CargoForm data={{cargoName: "", weight: ""}}/> */}
      {/* <AutoForm data={{cargoName: "", weight: ""}}/> */}
      {/* <CargoPostPage typePage='add'/> */}
      {/* <AutoPostPage typePage='add'/> */}
      {/* <CargoListPage /> */}
      {/* <AutoListPage /> */}
      {/* <Popup text={'Вы действительно хотите удалить запись?'} typePopup={'del'}/> */}
      {/* <DriverForm></DriverForm> */}
      {/* <DriverPostPage /> */}
      
      <Routes>
        <Route path='*' element={<MainSearchPage />} />
        <Route path='/cargo/list' element={<CargoListPage />} />
        <Route path='/auto/list' element={<AutoListPage />} />
        {/* <Route path='/driver/list' element={<CargoListPage />} /> */}
        <Route path='/cargo/add' element={<CargoPostPage typePage='add'/>} />
        <Route path='/auto/add' element={<AutoPostPage typePage='add'/>} />
        <Route path='/driver/add' element={<DriverPostPage typePage='add'/>} />
        <Route path='/cargo/edit' element={<CargoPostPage typePage='edit'/>} />
        <Route path='/auto/edit' element={<AutoPostPage typePage='edit'/>} />
        <Route path='/driver/edit' element={<DriverPostPage typePage='edit'/>} />
        <Route path='/reg' element={<RegistrationPage />} />
        <Route path='/auth' element={<AuthorizationPage />} />
      </Routes>
    </div>
  );
}

export default App;
