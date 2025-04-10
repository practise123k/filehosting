import React, { useEffect, useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { FolderList } from './components/FolderList';
import { AdminLogin } from './components/AdminLogin';
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { Upload } from 'lucide-react';
import { FileItem, Folder } from './types';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    const savedFiles = localStorage.getItem('uploadedFiles');
    const savedFolders = localStorage.getItem('folders');
    const adminStatus = localStorage.getItem('isAdmin');

    if (savedFiles) setFiles(JSON.parse(savedFiles));
    if (savedFolders) setFolders(JSON.parse(savedFolders));
    if (adminStatus) setIsAdmin(JSON.parse(adminStatus));
  }, []);

  const handleUploadComplete = (newFiles: FileItem[]) => {
    const filesWithFolder = newFiles.map(file => ({
      ...file,
      folderId: currentFolder
    }));
    const updatedFiles = [...files, ...filesWithFolder];
    setFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      created_at: new Date().toISOString()
    };
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    localStorage.setItem('folders', JSON.stringify(updatedFolders));
  };

  const handleAdminLogin = (success: boolean) => {
    setIsAdmin(success);
    setShowAdminLogin(false);
    if (success) {
      setShowAdminDashboard(true);
    }
    localStorage.setItem('isAdmin', JSON.stringify(success));
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowAdminDashboard(false);
    localStorage.removeItem('isAdmin');
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      setShowAdminDashboard(!showAdminDashboard);
      setShowAdminLogin(false);
    } else {
      setShowAdminLogin(true);
      setShowAdminDashboard(false);
    }
  };

  const handleHomeClick = () => {
    setShowAdminLogin(false);
    setShowAdminDashboard(false);
  };

  const filteredFiles = currentFolder
    ? files.filter(file => file.folderId === currentFolder)
    : files.filter(file => !file.folderId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar 
        isAdmin={isAdmin}
        onAdminClick={handleAdminClick}
        onHomeClick={handleHomeClick}
        onLogout={handleAdminLogout}
      />
      
      <div className="max-w-6xl mx-auto py-12 px-4">
        {showAdminLogin && !isAdmin && (
          <AdminLogin onLogin={handleAdminLogin} />
        )}

        {showAdminDashboard && isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <FolderList
                folders={folders}
                currentFolder={currentFolder}
                onFolderSelect={setCurrentFolder}
                onCreateFolder={handleCreateFolder}
              />
            </div>
            <div className="md:col-span-3">
              <FileUploader onUploadComplete={handleUploadComplete} />
              <FileList 
                files={filteredFiles}
                folders={folders}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        )}

        {!showAdminLogin && !showAdminDashboard && (
          <>
            <div className="text-center mb-8">
              <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">File Sharing Platform</h1>
              <p className="text-gray-600">Access and download shared files</p>
            </div>
            <FileList 
              files={files}
              folders={folders}
              isAdmin={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;