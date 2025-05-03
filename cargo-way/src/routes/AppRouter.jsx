import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthorizationPage from '../components/pages/AuthorizationPage';
import RegistrationPage from '../components/pages/RegistrationPage';
import CargoPostPage from '../components/pages/customerPages/CagroPostPage';
import AutoPostPage from '../components/pages/carrierPages/AutoPostPage';
import AutoListPage from '../components/pages/carrierPages/AutoListPage';
import PasswordRecoveryPage from '../components/pages/PasswordRecoveryPage';
import ProfilePage from '../components/pages/ProfilePage';
import HistoryListPage from '../components/pages/customerPages/HistoryListPage';
import ActiveListPage from '../components/pages/customerPages/ActiveListPage';
import MainPage from '../components/pages/MainPage';
import DriverPostPage from '../components/pages/carrierPages/DriverPostPage';
import DriverListPage from '../components/pages/carrierPages/DriverListPage';
import TrailerPostPage from '../components/pages/carrierPages/TrailerPostPage';
import TrailerListPage from '../components/pages/carrierPages/TrailerListPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='*' element={<MainPage />} />
            <Route path='/cargo/add' element={<CargoPostPage typePage='add'/>} />
            <Route path='/cargo/list/history' element={<HistoryListPage />} />
            <Route path='/cargo/list/active' element={<ActiveListPage />} />
            <Route path='/cargo/edit' element={<CargoPostPage typePage='edit' />} />
            
            <Route path='/driver/list' element={<DriverListPage/>} />
            <Route path='/driver/add' element={<DriverPostPage typePage='add' />} />
            <Route path='/driver/edit' element={<DriverPostPage typePage='edit' />} />
            <Route path='/trailer/list' element={<TrailerListPage />} />
            <Route path='/trailer/add' element={<TrailerPostPage typePage='add' />} />
            <Route path='/trailer/edit' element={<TrailerPostPage typePage='edit' />} />
            <Route path='/auto/list' element={<AutoListPage />} />
            <Route path='/auto/add' element={<AutoPostPage typePage='add' />} />
            <Route path='/auto/edit' element={<AutoPostPage typePage='edit' />} />

            <Route path='/reg' element={<RegistrationPage />} />
            <Route path='/auth' element={<AuthorizationPage />} />
            <Route path="/password-reset/" element={<PasswordRecoveryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
}

export default AppRouter;