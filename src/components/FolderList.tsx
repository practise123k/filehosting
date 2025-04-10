import React, { useState } from 'react';
import { FolderPlus, ChevronRight, Folder as FolderIcon } from 'lucide-react';
import { Folder } from '../types';

interface FolderListProps {
  folders: Folder[];
  currentFolder: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onCreateFolder: (name: string) => void;
}

export function FolderList({ folders, currentFolder, onFolderSelect, onCreateFolder }: FolderListProps) {
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Folders</h2>
      
      <form onSubmit={handleCreateFolder} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New folder name"
            className="flex-1 px-3 py-1 border rounded"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <button
          onClick={() => onFolderSelect(null)}
          className={`w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
            currentFolder === null ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <FolderIcon className="w-4 h-4" />
          <span>Root</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>
        
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onFolderSelect(folder.id)}
            className={`w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
              currentFolder === folder.id ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <FolderIcon className="w-4 h-4" />
            <span>{folder.name}</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );
}