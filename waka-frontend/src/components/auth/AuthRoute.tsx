import { Navigate } from 'react-router-dom';

// AuthRoute Component
import React, { type ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthRouteProps {
    children: ReactNode;
    isPublic: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children, isPublic }) => {
    const { isAuthenticated } = useAuth();

    if (isPublic && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!isPublic && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default AuthRoute;