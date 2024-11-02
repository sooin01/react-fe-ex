import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserList from './pages/user/UserList';
import MainLayout from './pages/MainLayout';

const App = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserList />} />
            </Route>
        </Routes>
    );
};

export default App;
