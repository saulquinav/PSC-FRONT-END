import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { InventoryItemListPage } from './pages/InventoryItemListPage';
import { AddInventoryItemPage } from './pages/AddInventoryItemPage';
import { EditInventoryItemPage } from './pages/EditInventoryItemPage';
import { UserCrudPage } from './crud-test-pages/UserCrudPage';
import { InventoryItemCrudPage } from './crud-test-pages/InventoryItemCrudPage';
import { NavBar } from './components/NavBar';
import { InventoryLogCrudPage } from './crud-test-pages/InventoryLogCrudPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/components" element={<InventoryItemListPage />} />
        <Route path="/add-component" element={<AddInventoryItemPage />} />
        <Route path="/edit-component" element={<EditInventoryItemPage />} />
        <Route path="/user-crud" element={<UserCrudPage />} />
        <Route path="/inventory-item-crud" element={<InventoryItemCrudPage />} />
        <Route path="/inventory-log-crud" element={<InventoryLogCrudPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
