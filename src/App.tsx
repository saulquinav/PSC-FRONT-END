import React, { useEffect, useState } from 'react';
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

import { AuthContext } from './components/AuthContext';

function App() {
  const [token, setToken] = useState<string | null>(null);

  // Load token from the browser's 'localStorage' when this component loads
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt-auth-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value = {{token, setToken}}>
      <BrowserRouter>
      {/* No 'token' and 'setToken' props needed for the navigation bar, because it gets its
       ** required props from the React 'AuthContext' automatically. */}
        <NavBar></NavBar>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/items" element={<InventoryItemListPage />} />
          <Route path="/add-item" element={<AddInventoryItemPage />} />
          <Route path="/edit-item" element={<EditInventoryItemPage />} />
          <Route path="/user-crud" element={<UserCrudPage />} />
          <Route path="/inventory-item-crud" element={<InventoryItemCrudPage />} />
          <Route path="/inventory-log-crud" element={<InventoryLogCrudPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>  
  );
}

export default App;
