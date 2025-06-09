import React, { useEffect, useState } from "react";
import axios from "axios";

import { getBackendBaseAPI } from "../service/api";
import { DocumentMetadataDTO } from "../types/docmetadata/DocumentMetadataDTO";

const API_URL = getBackendBaseAPI() + "/doc-metadatas";

export function DocumentMetadataCrudPage() {
  /* This internal "variable" keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [documentMetadatas, setDocumentMetadatas] = useState<DocumentMetadataDTO[]>([]);
  const [newName, setNewName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchDocumentMetadatas = async () => {
    try {
      const response = await axios.get<DocumentMetadataDTO[]>(API_URL);
      setDocumentMetadatas(response.data);
      setErrorMessage(null);
      setBackendAvailable(true);
    }
    catch (err) {
      setErrorMessage('Failed to fetch document metadata. Backend may be unavailable.');
      setBackendAvailable(false);
    }
  };

  const createDocumentMetadata = async () => {
    try {
    //   await axios.post<DocumentMetadataDTO>(API_URL, { name: newName }, { withCredentials: true });
      await axios.post(API_URL, { name: newName });
      setNewName('');
      fetchDocumentMetadatas();
    }
    catch (err) {
      setErrorMessage('Failed to create document metadata.');
      setBackendAvailable(false);
    }
  };

  const updateDocumentMetadata = async (id: number, name: string) => {
    try {
      await axios.put(`${API_URL}/${id}`, { name });
      fetchDocumentMetadatas();
    }
    catch (err) {
      setErrorMessage('Failed to update document metadata.');
      setBackendAvailable(false);
    }
  };

  const deleteDocumentMetadata = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDocumentMetadatas();
    }
    catch (err) {
      setErrorMessage('Failed to delete document metadata.');
      setBackendAvailable(false);
    }
  };

  useEffect(() => {
    fetchDocumentMetadatas();
  }, []);

  return (
    <div>
      <h1>Document Metadata CRUD</h1>

      {(!backendAvailable || errorMessage) && <div>{errorMessage}</div>}

      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New document name"
        />
        <button onClick={createDocumentMetadata}>Create</button>
      </div>

      <ul>
        {documentMetadatas.map((doc) => (
          <li key={doc.id}>
            <div>
              <div>ID: {doc.id}</div>
              <input
                type="text"
                defaultValue={doc.name}
                onBlur={(e) => updateDocumentMetadata(doc.id, e.target.value)}
              />
            </div>
            <button onClick={() => deleteDocumentMetadata(doc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}