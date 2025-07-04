import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/UserStore';

const ProtectedRoute = observer(({ children, allowedRoles }) => {
    const { role } = userStore;

    const isAuthenticated = role && role !== '';

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
});

export default ProtectedRoute;
