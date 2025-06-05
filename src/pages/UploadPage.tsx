import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";

export function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");
  const navigate = useNavigate();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && filename) {
      alert(`File ${filename} uploaded successfully!`);
      navigate("/dashboard");
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
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="upload-button-group">
            <button type="submit" className="upload-primary-button">Upload</button>
            <button 
              type="button" 
              className="upload-back-button"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}