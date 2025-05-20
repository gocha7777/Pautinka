import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const userRole = 'moderator'; // Для примера, нужно будет заменить на реальную роль

    return (
        <Route
            {...rest}
            render={(props) =>
                userRole === 'moderator' ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" /> // Перенаправление на главную страницу
                )
            }
        />
    );
};

export default ProtectedRoute;
