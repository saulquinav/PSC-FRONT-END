import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DownloadPage.css";

interface DocumentDTO {
  id: number;
  name: string;
  size: number;
  uploadDate: string;
}

export function DownloadPage() {
  const [documents, setDocuments] = useState<DocumentDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch documents');
        
        const data: DocumentDTO[] = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  };

  const handleDownload = async (docId: number, docName: string) => {
    try {
      const response = await fetch(`/api/documents/${docId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = docName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Download failed");
    }
  };

  return (
    <div className="download-container">
      <div className="download-card">
        <div className="download-header">
          <h2>Your Files</h2>
          <p className="download-subtitle">Manage and download your stored files</p>
        </div>

        {isLoading ? (
          <div className="download-loading">Loading your files...</div>
        ) : documents.length === 0 ? (
          <div className="download-empty-state">
            <p>No files found</p>
            <button 
              onClick={() => navigate("/upload")}
              className="download-primary-button"
            >
              Upload your first file
            </button>
          </div>
        ) : (
          <div className="download-files-list">
            {documents.map((doc) => (
              <div key={doc.id} className="download-file-item">
                <div className="download-file-info">
                  <span className="download-file-name">{doc.name}</span>
                  <span className="download-file-meta">
                    {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(doc.id, doc.name)}
                  className="download-primary-button"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={() => navigate("/dashboard")} 
          className="download-back-button"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}