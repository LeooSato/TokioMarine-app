export type SignupRequest = { username: string; email: string; password: string; };
export type UserResponse  = { id: number; username: string; email: string; role: string; accountNumber?: string; createdAt: string; };

export type LoginRequest  = { username: string; password: string; };
export type AuthResponse  = { token: string; tokenType: string; accountNumber?: string; };

export type TransferRequest  = { accountFrom: string; accountTo: string; amount: number; transferDate: string; };
export type TransferResponse = { id: number; accountFrom: string; accountTo: string; amount: number; fee: number; scheduleDate: string; transferDate: string; };

export type Contact = { fullName: string; accountNumber: string };
