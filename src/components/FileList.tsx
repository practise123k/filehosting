import React from 'react';
import { File, Folder, Link as LinkIcon, Download, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { FileItem, Folder as FolderType } from '../types';

interface FileListProps {
  files: FileItem[];
  folders: FolderType[];
  isAdmin: boolean;
}

export function FileList({ files, folders, isAdmin }: FileListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleShare = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const getFolderName = (folderId: string | null) => {
    if (!folderId) return 'Root';
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : 'Unknown Folder';
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Files</h2>
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {file.type.includes('folder') ? (
                <Folder className="w-6 h-6 text-yellow-500" />
              ) : (
                <File className="w-6 h-6 text-blue-500" />
              )}
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.size)} • {new Date(file.created_at).toLocaleDateString()} • 
                  {getFolderName(file.folderId)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleShare(file.url)}
                className="flex items-center space-x-1 p-2 text-sm text-blue-500 hover:text-blue-700"
                title="Copy share link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <a
                href={file.url}
                download={file.name}
                className="flex items-center space-x-1 p-2 text-sm text-green-500 hover:text-green-700"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </a>
              {isAdmin && (
                <button
                  onClick={() => {
                    // Handle delete in a real app
                    toast.error('Delete functionality would be implemented here');
                  }}
                  className="flex items-center space-x-1 p-2 text-sm text-red-500 hover:text-red-700"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}