import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ComponentListPage } from './pages/ComponentListPage';
import { AddComponentPage } from './pages/AddComponentPage';
import { EditComponentPage } from './pages/EditComponentPage';
import { UserCrudPage } from './crud-test-pages/UserCrudPage';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/components" element={<ComponentListPage />} />
        <Route path="/add-component" element={<AddComponentPage />} />
        <Route path="/edit-component" element={<EditComponentPage />} />
        <Route path="/user-crud" element={<UserCrudPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
