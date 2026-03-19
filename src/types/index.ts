export interface FileItem {
  id: string;
  original_name: string;
  file_size: number;
  sha256_hash: string;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  username: string;
  email?: string;
}