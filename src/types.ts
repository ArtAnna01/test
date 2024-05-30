export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  registeredUsers: User[];
  registerUser: (user: User) => void;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
}

export interface Post {
  id: number;
  title: string;
  views: number;
}

export interface Comment {
  id: string;
  text: string;
  postId: string;
}

export interface Profile {
  name: string;
}
