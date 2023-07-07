export interface IRegisterPayload {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  PhoneNumber?: string;
  Password?: string;
  ConfirmPassword?: string;
  demoPhoneNumber?: string;
}

export interface IForgotPasswordPayload {
  email: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface IGetListPayload {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  searchKey?: string;
}

export interface IMissionThemePayload {
  id?: number;
  title: string;
  status: number;
}
