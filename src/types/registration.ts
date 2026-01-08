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

export interface UploadFileDeleteRequest {
    uploadSessionId: string;
    fieldName: string;
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

// RSVP Types
export type RsvpStatus = 'accepted' | 'confirmed' | 'not_attending';

export interface RsvpEventDetails {
    title: string;
    dateTime: string | null;
    location: string | null;
    description: string | null;
}

export interface RsvpRegistrationDetails {
    status: RsvpStatus;
    submittedAt: string;
    confirmedAt: string | null;
}

export interface RsvpDetailsResponse {
    event: RsvpEventDetails;
    registration: RsvpRegistrationDetails;
    currentStatus: RsvpStatus;
    canConfirm: boolean;
    canDecline: boolean;
    isFinal: boolean;
    eventHasPassed: boolean;
}

export interface RsvpConfirmResponse {
    success: boolean;
    message: string;
    event: {
        title: string | null;
        dateTime: string | null;
        location: string | null;
    };
}

export interface RsvpDeclineResponse {
    success: boolean;
    message: string;
    final: boolean;
}
