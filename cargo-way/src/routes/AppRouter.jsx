import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthorizationPage from '../components/pages/AuthorizationPage';
import RegistrationPage from '../components/pages/RegistrationPage';
import MainSearchPage from '../components/pages/MainSearchPage';
import CargoPostPage from '../components/pages/customerPages/CagroPostPage';
import AutoPostPage from '../components/pages/carrierPages/AutoPostPage';
import AutoListPage from '../components/pages/carrierPages/AutoListPage';
import DriverPostPage from '../components/pages/driverPages/DriverPostPage';
import PasswordRecoveryPage from '../components/pages/PasswordRecoveryPage';
import ProfilePage from '../components/pages/ProfilePage';
import GeneralListPage from '../components/pages/customerPages/GeneralListPage';
import HistoryListPage from '../components/pages/customerPages/HistoryListPage';
import ActiveListPage from '../components/pages/customerPages/ActiveListPage';
import MainPage from '../components/pages/MainPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='*' element={<MainSearchPage />} />
            <Route path='/cargo/add' element={<CargoPostPage typePage='add'/>} />
            <Route path='/cargo/list/history' element={<HistoryListPage />} />
            <Route path='/cargo/list/active' element={<ActiveListPage />} />
            <Route path='/auto/list' element={<AutoListPage />} />
            {/* <Route path='/driver/list' element={<CargoListPage />} /> */}
            <Route path='/auto/add' element={<AutoPostPage typePage='add' />} />
            <Route path='/driver/add' element={<DriverPostPage typePage='add' />} />
            <Route path='/cargo/edit' element={<CargoPostPage typePage='edit' />} />
            <Route path='/auto/edit' element={<AutoPostPage typePage='edit' />} />
            <Route path='/driver/edit' element={<DriverPostPage typePage='edit' />} />
            <Route path='/reg' element={<RegistrationPage />} />
            <Route path='/auth' element={<AuthorizationPage />} />
            <Route path="/password-reset/" element={<PasswordRecoveryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
}

export default AppRouter;