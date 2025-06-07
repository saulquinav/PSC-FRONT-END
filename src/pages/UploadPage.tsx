import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";

interface DocumentDTO {
  name: string;
  data: Blob;
}

export function UploadPage() {
  const [documentData, setDocumentData] = useState<Omit<DocumentDTO, 'data'>>({
    name: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !documentData.name) {
      alert("Please select a file and enter a filename");
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', documentData.name);

      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert(`File ${documentData.name} uploaded successfully!`);
      navigate("/dashboard");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Files</h2>
        <p className="upload-description">Securely store your files in your personal space</p>
        
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label>Filename</label>
            <input
              type="text"
              placeholder="Enter filename"
              value={documentData.name}
              onChange={(e) => setDocumentData({...documentData, name: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Select File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="upload-button-group">
            <button 
              type="submit" 
              className="upload-primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            <button 
              type="button" 
              className="upload-back-button"
              onClick={() => navigate("/dashboard")}
              disabled={isLoading}
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}