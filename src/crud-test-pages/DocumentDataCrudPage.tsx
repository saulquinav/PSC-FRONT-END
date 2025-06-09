import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DocumentDataDTO } from '../types/docdata/DocumentDataDTO';
import { getBackendBaseAPI } from '../service/api';

const API_URL = getBackendBaseAPI() + "/doc-datas";

export function DocumentDataCrudPage() {
  const [documents, setDocuments] = useState<DocumentDataDTO[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get<DocumentDataDTO[]>(API_URL);
      setDocuments(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch documents from the server.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];
        if (!base64data) return;

        await axios.post(API_URL, {data: base64data}, {headers: { 'Content-Type': 'application/json'}});

        setSelectedFile(null);
        fetchDocuments();
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError('Failed to upload the file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDocuments();
    } catch (err) {
      setError(`Failed to delete document with ID ${id}.`);
    }
  };

  const handleUpdate = async (id: number, file: File) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];
        if (!base64data) return;

        await axios.put(`${API_URL}/${id}`, {id, data: base64data}, {headers: { 'Content-Type': 'application/json' }});
        fetchDocuments();
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(`Failed to update document with ID ${id}.`);
    }
  };

  return (
    <div>
      <h1>Document Data CRUD</h1>

      {error && <div>{error}</div>}

      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile || isUploading}>Upload File</button>
      </div>

      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <p>ID: {doc.id}</p>
            <button onClick={() => handleDelete(doc.id)}>Delete</button>
            <label className="ml-2 inline-block">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleUpdate(doc.id, e.target.files[0]);
                  }
                }}
              />
              <span>Update</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}