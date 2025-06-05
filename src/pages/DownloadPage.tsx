import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DownloadPage.css";

interface FileItem {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

export function DownloadPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch files
    const fetchFiles = async () => {
      try {
        // Replace with actual API call
        const mockFiles: FileItem[] = [
          { id: "1", name: "document.pdf", size: "2.4 MB", uploadedAt: "2023-05-15" },
          { id: "2", name: "presentation.pptx", size: "5.1 MB", uploadedAt: "2023-05-10" },
          { id: "3", name: "image.jpg", size: "1.2 MB", uploadedAt: "2023-05-05" },
        ];
        setFiles(mockFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (fileId: string, fileName: string) => {
    // Simulate download functionality
    console.log(`Downloading file ${fileId}: ${fileName}`);
    alert(`Download started for: ${fileName}`);
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
        ) : files.length === 0 ? (
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
            {files.map((file) => (
              <div key={file.id} className="download-file-item">
                <div className="download-file-info">
                  <span className="download-file-name">{file.name}</span>
                  <span className="download-file-meta">
                    {file.size} • Uploaded {file.uploadedAt}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(file.id, file.name)}
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