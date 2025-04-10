export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
  folderId: string | null;
}

export interface Folder {
  id: string;
  name: string;
  created_at: string;
}

export interface AdminUser {
  username: string;
  password: string;
}