"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Calendar, CircleCheck, Loader2, MapPin, Upload } from "lucide-react";

import { publicApi } from "@/lib/public-api";
import { useUploadThing } from "@/lib/uploadthing";
import {
    PublicEventDetail,
    RegistrationFormField,
    RegistrationFormSchema,
    RegistrationSubmitRequest,
} from "@/types/registration";
import { Button } from "@/components/ui/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RegistrationFormProps = {
    readonly event: PublicEventDetail;
    readonly slug: string;
};

type FieldErrors = Record<string, string[]>;
type FileUploadState = {
    status: "idle" | "uploading" | "uploaded" | "error" | "deleting";
    file?: File;
    url?: string;
    fileId?: string;
    error?: string;
};

function getDefaultValue(field: RegistrationFormField) {
    if (field.type === 'checkbox') return [] as string[];
    if (field.type === 'select' || field.type === 'radio') return '';
    return '';
}

function formatDate(value?: string | null) {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;

    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
    }).format(parsed);
}

function validateCheckboxField(required: boolean, value: unknown) {
    const list = Array.isArray(value) ? value : [];
    if (required && list.length === 0) {
        return ['Please select at least one option.'];
    }
    return [];
}

function validateFileField(
    required: boolean,
    validation: RegistrationFormField['validation'] | undefined,
    value: unknown
) {
    const errors: string[] = [];
    const file = value instanceof File ? value : undefined;

    if (required) {
        errors.push('File upload is required but not yet supported on this site.');
    }
    if (file) {
        errors.push('File uploads are not supported yet. Please do not attach a file.');
    }
    if (validation?.maxSize && file && file.size > validation.maxSize) {
        errors.push(
            `File must be smaller than ${Math.round(validation.maxSize / 1024 / 1024)}MB.`
        );
    }
    if (file && validation?.allowedTypes?.length && !validation.allowedTypes.includes(file.type)) {
        errors.push('Unsupported file type.');
    }

    return errors;
}

function validateTextField(
    required: boolean,
    validation: RegistrationFormField['validation'] | undefined,
    value: unknown
) {
    const errors: string[] = [];
    const text = typeof value === 'string' ? value.trim() : '';

    if (required && !text) {
        errors.push('This field is required.');
    }
    if (validation?.minLength && text.length < validation.minLength) {
        errors.push(`Must be at least ${validation.minLength} characters.`);
    }
    if (validation?.maxLength && text.length > validation.maxLength) {
        errors.push(`Must be at most ${validation.maxLength} characters.`);
    }
    if (validation?.pattern) {
        try {
            const regex = new RegExp(validation.pattern);
            if (text && !regex.test(text)) {
                errors.push('Invalid format.');
            }
        } catch {
            // ignore invalid regex
        }
    }

    return errors;
}

function validateField(field: RegistrationFormField, value: unknown): string[] {
    const { required, validation } = field;

    if (field.type === 'checkbox') {
        return validateCheckboxField(required ?? false, value);
    }
    if (field.type === 'file') {
        return validateFileField(required ?? false, validation, value);
    }
    return validateTextField(required ?? false, validation, value);
}

export function RegistrationForm({ event, slug }: RegistrationFormProps) {
    const schema: RegistrationFormSchema | null =
        event.registrationFormSchema ?? null;

    const [formValues, setFormValues] = useState<Record<string, unknown>>(() => {
        const initial: Record<string, unknown> = {};
        schema?.fields.forEach((field) => {
            initial[field.id] = getDefaultValue(field);
        });
        return initial;
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [activeDropField, setActiveDropField] = useState<string | null>(null);
    const [fileUploads, setFileUploads] = useState<Record<string, FileUploadState>>({});

    const uploadSessionId = useMemo(
        () =>
            typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}`,
        []
    );

    const { startUpload } = useUploadThing("resumeUploader", {
        onUploadError: () => undefined,
    });

    if (!schema) {
        return (
            <div className="w-full max-w-3xl space-y-2">
                <p className="text-xl font-semibold text-primary">Registration unavailable</p>
                <p className="text-sm text-muted-foreground">
                    This event does not yet have a published registration form.
                </p>
            </div>
        );
    }

    const headline = schema.autoAccept
        ? `Register for ${event.title}`
        : `Application for ${event.title}`;

    const isClosed = (() => {
        if (!event.registrationDeadline) return false;
        const deadline = new Date(event.registrationDeadline);
        return Number.isFinite(deadline.getTime()) && deadline.getTime() < Date.now();
    })();

    const eventDateDisplay = formatDate(event.dateTime);
    const deadlineDisplay = formatDate(event.registrationDeadline);

    if (isClosed) {
        return (
            <div className="w-full max-w-5xl space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-primary">
                        {headline}
                    </h1>
                    <div className="space-y-2 text-sm text-foreground">
                        {eventDateDisplay && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{eventDateDisplay}</span>
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                        )}
                        {deadlineDisplay && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span>Registration closed on {deadlineDisplay}</span>
                            </div>
                        )}
                    </div>
                </div>

                <Alert className="border-amber-300 bg-amber-50 text-amber-900">
                    <AlertTitle>Registration is closed</AlertTitle>
                    <AlertDescription>
                        This form is no longer accepting responses.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const handleTextChange = (fieldId: string, value: string) => {
        setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleCheckboxChange = (
        fieldId: string,
        option: string,
        checked: boolean
    ) => {
        setFormValues((prev) => {
            const current = Array.isArray(prev[fieldId])
                ? (prev[fieldId] as string[])
                : [];
            const next = checked
                ? Array.from(new Set([...current, option]))
                : current.filter((item) => item !== option);
            return { ...prev, [fieldId]: next };
        });
    };

    const handleFileUpload = async (fieldId: string, file: File | null) => {
        if (!file) {
            setFileUploads((prev) => ({
                ...prev,
                [fieldId]: { status: "idle" },
            }));
            setFormValues((prev) => ({ ...prev, [fieldId]: '' }));
            return;
        }

        // local guard to match backend limits
        if (file.size > 2_097_152) {
            setFileUploads((prev) => ({
                ...prev,
                [fieldId]: { status: "error", file, error: "File must be under 2MB." },
            }));
            return;
        }
        if (file.type !== "application/pdf") {
            setFileUploads((prev) => ({
                ...prev,
                [fieldId]: { status: "error", file, error: "Only PDF files are allowed." },
            }));
            return;
        }

        setFileUploads((prev) => ({
            ...prev,
            [fieldId]: { status: "uploading", file },
        }));

        try {
            const uploadRes = await startUpload([file]);
            const uploaded = uploadRes?.[0];

            if (!uploaded?.ufsUrl) {
                throw new Error("Upload failed. Please try again.");
            }

            const meta = await publicApi.uploadRegistrationFile(slug, {
                uploadSessionId,
                fieldName: fieldId,
                fileUrl: uploaded.ufsUrl,
                fileName: file.name,
                fileSize: file.size,
                mimeType: file.type,
                eventId: event.id,
            });
            const returnedFileId = meta.fileId;

            setFileUploads((prev) => ({
                ...prev,
                [fieldId]: {
                    status: "uploaded",
                    file,
                    url: uploaded.ufsUrl,
                    fileId: returnedFileId,
                },
            }));
            setFormValues((prev) => ({ ...prev, [fieldId]: file.name }));
        } catch (err) {
            setFileUploads((prev) => ({
                ...prev,
                [fieldId]: {
                    status: "error",
                    file,
                    error:
                        err instanceof Error
                            ? err.message
                            : "Upload failed. Please try again.",
                },
            }));
        }
    };

    const handleFileChange = (fieldId: string, fileList: FileList | null) => {
        const file = fileList?.[0] ?? null;
        handleFileUpload(fieldId, file);
    };

    const validateAll = () => {
        const errors: FieldErrors = {};
        schema.fields.forEach((field) => {
            const errs = validateField(field, formValues[field.id]);
            if (errs.length) errors[field.id] = errs;
        });
        setFieldErrors(errors);
        return errors;
    };

    const renderTextareaField = (field: RegistrationFormField, value: unknown) => {
        const textValue = typeof value === 'string' ? value : '';
        const minLength = field.validation?.minLength;
        const maxLength = field.validation?.maxLength;

        return (
            <div className="flex flex-col gap-1.5">
                <Textarea
                    value={textValue}
                    placeholder={field.placeholder}
                    disabled={submitting || isClosed}
                    onChange={(e) => handleTextChange(field.id, e.target.value)}
                />
                {(minLength || maxLength) && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                            {minLength ? `Minimum ${minLength} characters.` : ''}
                        </span>
                        <span>
                            {maxLength
                                ? `${textValue.length}/${maxLength}`
                                : `${textValue.length} characters`}
                        </span>
                    </div>
                )}
            </div>
        );
    };

    const renderSelectField = (field: RegistrationFormField, value: unknown) => (
        <Select
            value={typeof value === 'string' ? value : ''}
            onValueChange={(v) => handleTextChange(field.id, v)}
            disabled={submitting || isClosed}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );

    const renderRadioField = (field: RegistrationFormField, value: unknown) => (
        <RadioGroup
            value={typeof value === 'string' ? value : ''}
            onValueChange={(v) => handleTextChange(field.id, v)}
            disabled={submitting || isClosed}
            className="grid gap-3"
        >
            {field.options?.map((option) => (
                <label
                    key={option}
                    className="flex items-center gap-3 text-sm text-foreground"
                >
                    <RadioGroupItem value={option} />
                    <span>{option}</span>
                </label>
            ))}
        </RadioGroup>
    );

    const renderCheckboxField = (field: RegistrationFormField, value: unknown) => (
        <div className="flex flex-col gap-2">
            {field.options?.map((option) => {
                const list = Array.isArray(value) ? (value as string[]) : [];
                const checked = list.includes(option);
                return (
                    <label
                        key={option}
                        className="flex items-center gap-3 text-sm text-foreground"
                    >
                        <Checkbox
                            checked={checked}
                            onCheckedChange={(checkedValue) =>
                                handleCheckboxChange(field.id, option, checkedValue === true)
                            }
                            disabled={submitting || isClosed}
                        />
                        <span>{option}</span>
                    </label>
                );
            })}
        </div>
    );

    const getFileKeyFromUrl = (url: string | undefined) => {
        if (!url) return null;
        const parts = url.split("/");
        if (!parts.length) return null;
        const last = parts[parts.length - 1];
        return last?.split("?")[0] || null;
    };

    const renderFileField = (field: RegistrationFormField, value: unknown) => {
        const uploadState = fileUploads[field.id] ?? { status: "idle" as const };
        const isBusy = submitting || isClosed || uploadState.status === "uploading";
        const deleteInFlight = uploadState.status === "deleting";

        return (
            <div className="flex flex-col gap-2">
                <label
                    htmlFor={`file-${field.id}`}
                    className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center text-sm transition ${
                        activeDropField === field.id
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/40 hover:border-primary/70'
                    } ${isBusy ? 'opacity-60' : ''}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setActiveDropField(field.id);
                    }}
                    onDragLeave={() => setActiveDropField(null)}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFileChange(field.id, e.dataTransfer.files);
                        setActiveDropField(null);
                    }}
                >
                    <Upload className="h-5 w-5 text-primary" />
                    <div className="flex flex-col">
                        <span className="font-medium">
                            {uploadState.status === "uploading" ? "Uploading..." : "Upload a file"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {uploadState.file?.name ??
                                (value instanceof File && value.name
                                    ? value.name
                                    : 'Drag and drop or click to choose (PDF, max 2MB)')}
                        </span>
                    </div>
                </label>
                <Input
                    id={`file-${field.id}`}
                    type="file"
                    accept={field.validation?.allowedTypes?.join(',')}
                    disabled={isBusy}
                    className="hidden"
                    onChange={(e) => handleFileChange(field.id, e.target.files)}
                />
                <span className="text-xs text-muted-foreground">
                    PDF only, max 2MB. Files are stored after successful upload.
                </span>
                {uploadState.status === "uploaded" && uploadState.file && (
                    <div className="flex items-center justify-between text-xs">
                        <div className="text-emerald-700 inline-flex items-center gap-1">
                            <CircleCheck className="h-4 w-4" />
                            <span>Uploaded {uploadState.file.name}</span>
                        </div>
                        <button
                            type="button"
                            className="text-destructive hover:underline disabled:opacity-60"
                            disabled={deleteInFlight}
                            onClick={async () => {
                                if (!uploadState.fileId) return;
                                setFileUploads((prev) => ({
                                    ...prev,
                                    [field.id]: { ...uploadState, status: "deleting" },
                                }));
                                try {
                                    await publicApi.deleteRegistrationFile(
                                        slug,
                                        uploadState.fileId,
                                        {
                                            uploadSessionId,
                                            fieldName: field.id,
                                        }
                                    );
                                    const fileKey = getFileKeyFromUrl(uploadState.url);
                                    if (fileKey) {
                                        await fetch("/api/uploadthing/delete", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ fileKey }),
                                        });
                                    }
                                    setFileUploads((prev) => ({
                                        ...prev,
                                        [field.id]: { status: "idle" },
                                    }));
                                    setFormValues((prev) => ({ ...prev, [field.id]: '' }));
                                } catch (err) {
                                    setFileUploads((prev) => ({
                                        ...prev,
                                        [field.id]: {
                                            ...uploadState,
                                            status: "error",
                                            error:
                                                err instanceof Error
                                                    ? err.message
                                                    : "Failed to delete file.",
                                        },
                                    }));
                                }
                            }}
                        >
                            Remove
                        </button>
                    </div>
                )}
                {uploadState.status === "error" && uploadState.error && (
                    <div className="text-xs text-destructive">{uploadState.error}</div>
                )}
            </div>
        );
    };

    const renderTextField = (field: RegistrationFormField, value: unknown) => (
        <Input
            type="text"
            value={typeof value === 'string' ? value : ''}
            placeholder={field.placeholder}
            disabled={submitting || isClosed}
            onChange={(e) => handleTextChange(field.id, e.target.value)}
        />
    );

    const renderField = (field: RegistrationFormField) => {
        const value = formValues[field.id];
        const rendererMap: Record<RegistrationFormField['type'], () => ReactNode> = {
            textarea: () => renderTextareaField(field, value),
            select: () => renderSelectField(field, value),
            radio: () => renderRadioField(field, value),
            checkbox: () => renderCheckboxField(field, value),
            file: () => renderFileField(field, value),
            text: () => renderTextField(field, value),
        };

        return (rendererMap[field.type] ?? rendererMap.text)();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        setSuccessMessage(null);

        const errors = validateAll();
        if (Object.keys(errors).length > 0) return;

        const hasUploading = Object.values(fileUploads).some(
            (state) => state.status === "uploading" || state.status === "deleting"
        );
        if (hasUploading) {
            setSubmitError("Please wait for file uploads to finish.");
            return;
        }

        const requiredFileMissing = schema.fields.some(
            (field) =>
                field.type === 'file' &&
                field.required &&
                (fileUploads[field.id]?.status !== "uploaded" ||
                    !fileUploads[field.id]?.url)
        );
        if (requiredFileMissing) {
            setSubmitError("Please upload the required file(s) before submitting.");
            return;
        }

        setSubmitting(true);
        try {
            const payload: RegistrationSubmitRequest = {
                uploadSessionId,
                formData: {},
            };

            schema.fields.forEach((field) => {
                const current = formValues[field.id];

                if (field.type === 'file') {
                    const uploadState = fileUploads[field.id];
                    payload.formData[field.id] = uploadState?.url
                        ? {
                              fileUrl: uploadState.url,
                              fileName: uploadState.file?.name ?? '',
                          }
                        : null;
                    return;
                }

                if (field.type === 'checkbox') {
                    payload.formData[field.id] = Array.isArray(current) ? current : [];
                    return;
                }

                payload.formData[field.id] = current ?? '';
            });

            const response = await publicApi.submitRegistration(slug, payload);
            setSuccessMessage(response.message);
        } catch (err) {
            setSubmitError(
                err instanceof Error
                    ? err.message
                    : 'Failed to submit registration. Please try again.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const isWideField = (fieldType: RegistrationFormField['type']) =>
        ['textarea', 'checkbox', 'file', 'radio'].includes(fieldType);

    return (
        <div className="w-full max-w-5xl space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-primary">{headline}</h1>
                <div className="space-y-2 text-sm text-foreground">
                    {eventDateDisplay && (
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{eventDateDisplay}</span>
                        </div>
                    )}
                    {event.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                        </div>
                    )}
                    {deadlineDisplay && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>
                                Registration closes on {deadlineDisplay}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
                {submitError && (
                    <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                        {submitError}
                    </div>
                )}

                {successMessage ? (
                    <div className="space-y-4 rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-sm text-emerald-900">
                        <div className="inline-flex items-center gap-2 text-lg font-semibold">
                            <CircleCheck className="h-5 w-5 text-emerald-600" />
                            <span>Registration Submitted</span>
                        </div>
                        <p>{successMessage}</p>
                        <Button
                            variant="outline"
                            className="w-fit"
                            onClick={() => {
                                globalThis.location.href = '/events';
                            }}
                        >
                            Return to Events
                        </Button>
                    </div>
                ) : (
                    <>
                        {schema.autoAccept && (
                            <Alert className="border-primary/30 bg-primary/5 text-primary-foreground/80">
                                <AlertTitle>You will automatically be accepted to this event.</AlertTitle>
                                <AlertDescription>
                                    You may receive a confirmation email shortly after submitting.
                                </AlertDescription>
                            </Alert>
                        )}

                        <FieldSet className="space-y-6">
                            <FieldSeparator />
                            <FieldGroup className="grid gap-6 md:grid-cols-2">
                                {schema.fields.map((field) => {
                                    const uploadState = fileUploads[field.id];
                                    const combinedErrors = [
                                        ...(fieldErrors[field.id]?.map((message) => ({
                                            message,
                                        })) ?? []),
                                        ...(uploadState?.error
                                            ? [{ message: uploadState.error }]
                                            : []),
                                    ];

                                    return (
                                        <Field
                                            key={field.id}
                                            className={`gap-2 ${isWideField(field.type) ? 'md:col-span-2' : ''}`}
                                        >
                                            <FieldLabel>
                                                <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                                                    <span>{field.label}</span>
                                                    {field.required && (
                                                        <span className="text-destructive">*</span>
                                                    )}
                                                </div>
                                            </FieldLabel>
                                            <FieldContent>
                                                {renderField(field)}
                                                {field.helperText && (
                                                    <FieldDescription>
                                                        {field.helperText}
                                                    </FieldDescription>
                                                )}
                                                <FieldError errors={combinedErrors} />
                                            </FieldContent>
                                        </Field>
                                    );
                                })}
                            </FieldGroup>
                        </FieldSet>

                        <div className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                className="w-full md:w-fit"
                                disabled={submitting || isClosed}
                            >
                                {submitting ? (
                                    <span className="inline-flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Registration'
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
