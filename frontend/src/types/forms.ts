import type { ChangeEvent, FormEvent } from "react";
import type { ValidationErrors } from "./validation";
import type { FeedbackState } from "./ui";

// Form Data Types
interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

// Form Props Types
interface LoginFormProps {
  formData: LoginFormData;
  isLoading: boolean;
  feedback: FeedbackState;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface RegisterFormProps {
  formData: RegisterFormData;
  errors: ValidationErrors;
  isLoading: boolean;
  feedback: FeedbackState;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type { RegisterFormData, LoginFormData, LoginFormProps, RegisterFormProps };
