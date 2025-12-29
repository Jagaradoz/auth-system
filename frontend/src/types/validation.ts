// Validation Types
type ValidationErrors = {
  [key: string]: string;
};

interface ValidationResult {
  errors: ValidationErrors;
  isValid: boolean;
}

export type { ValidationErrors, ValidationResult };
