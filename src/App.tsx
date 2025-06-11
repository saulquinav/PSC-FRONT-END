import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ComponentListPage } from './pages/ComponentListPage';
import { AddComponentPage } from './pages/AddComponentPage';
import { EditComponentPage } from './pages/EditComponentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/components" element={<ComponentListPage />} />
        <Route path="/add-component" element={<AddComponentPage />} />
        <Route path="/edit-component" element={<EditComponentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
