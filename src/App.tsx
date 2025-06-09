import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { DownloadPage } from './pages/DownloadPage';
import { NavBar } from './components/NavBar';
import { UserCrudPage } from './crud-test-pages/UserCrudPage';
import { DocumentMetadataCrudPage } from './crud-test-pages/DocumentMetadataCrudPage';
import { DocumentDataCrudPage } from './crud-test-pages/DocumentDataCrudPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/user-crud" element={<UserCrudPage />} />
        <Route path="/doc-metadata-crud" element={<DocumentMetadataCrudPage />} />
        <Route path="/doc-data-crud" element={<DocumentDataCrudPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;