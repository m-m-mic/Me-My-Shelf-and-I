export type ErrorState = ErrorType[];

export const initialErrorState: ErrorState = [];

export interface ErrorType {
  error: string;
  message: string;
}
