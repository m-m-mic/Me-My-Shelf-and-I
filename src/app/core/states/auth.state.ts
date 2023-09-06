export interface AuthState {
  token: string;
  user: UserData | null;
}

export interface UserData {
  displayName?: string;
  email: string;
  uid: string;
}

export const initialAuthState: AuthState = {
  token: '',
  user: null,
};
