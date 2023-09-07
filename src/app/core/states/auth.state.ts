export interface AuthState {
  token: string;
  user: UserData;
}

export interface UserData {
  displayName: string;
  email: string;
  uid: string;
}

export const initialAuthState: AuthState = {
  token: '',
  user: {
    displayName: '',
    email: '',
    uid: '',
  },
};
