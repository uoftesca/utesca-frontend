export type RegistrationFieldType =
    | 'text'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'file';

export interface RegistrationFieldValidation {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    maxSize?: number;
    allowedTypes?: string[];
}

export interface RegistrationFormField {
    id: string;
    type: RegistrationFieldType;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
    helperText?: string;
    validation?: RegistrationFieldValidation;
}

export interface RegistrationFormSchema {
    autoAccept?: boolean;
    fields: RegistrationFormField[];
}

export interface UploadFileRequest {
    uploadSessionId: string;
    fieldName: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    eventId: string;
}

export interface UploadFileResponse {
    success: boolean;
    fileId: string;
}

export interface RegistrationSubmitRequest {
    formData: Record<string, unknown>;
    uploadSessionId: string;
}

export interface RegistrationSubmitResponse {
    success: boolean;
    registrationId: string;
    message: string;
}

export interface PublicEventDetail {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    dateTime: string | null;
    location?: string | null;
    registrationDeadline?: string | null;
    registrationFormSchema?: RegistrationFormSchema | null;
}
