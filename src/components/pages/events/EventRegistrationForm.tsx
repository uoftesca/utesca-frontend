"use client";

import { useState } from "react";
import { Calendar, CircleCheck, Loader2, MapPin } from "lucide-react";

import { publicApi } from "@/lib/public-api";
import type {
    PublicEventDetail,
    RegistrationSubmitRequest,
} from "@/types/registration";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";

/**
 * Confirmed against src/lib/public-api.ts's `mapEvent()`: PublicEventDetail
 * is built from exactly `{ id, slug, title, description, dateTime, location,
 * registrationDeadline, registrationFormSchema }`, which lines up with the
 * `GET /api/v1/events` payload and the fields RegistrationForm.tsx already
 * reads (event.id, event.title, event.dateTime, event.location,
 * event.registrationDeadline). 
 *
 * Deliberately NOT reusing `registrationFormSchema` here: the event-list
 * payload's schema shape (`{ name, type: "string", required }`) does not
 * match the richer `RegistrationFormField` shape (`{ id, label, type,
 * validation, options... }`) that the existing dynamic RegistrationForm
 * renders. This component doesn't need it — it only renders the fixed
 * first/last/email/notifications fields described in the spec.
 */
export type EventSummary = Pick<
    PublicEventDetail,
    "id" | "slug" | "title" | "dateTime" | "location" | "registrationDeadline"
>;

export type EventRegistrationFormProps = {
    event: EventSummary;
    onClose?: () => void;
    onSuccess?: () => void;
};

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    emailNotifications: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatDate(value?: string | null) {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;

    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
    }).format(parsed);
}

export function EventRegistrationForm({
    event,
    onClose,
    onSuccess,
}: EventRegistrationFormProps) {
    const [formState, setFormState] = useState<FormState>({
        firstName: "",
        lastName: "",
        email: "",
        emailNotifications: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const eventDateDisplay = formatDate(event.dateTime);
    const deadlineDisplay = formatDate(event.registrationDeadline);

    const isClosed = (() => {
        if (!event.registrationDeadline) return false;
        const deadline = new Date(event.registrationDeadline);
        return (
            Number.isFinite(deadline.getTime()) && deadline.getTime() < Date.now()
        );
    })();

    const handleChange = <K extends keyof FormState>(
        key: K,
        value: FormState[K]
    ) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    const validate = (): FormErrors => {
        const next: FormErrors = {};
        if (!formState.firstName.trim()) {
            next.firstName = "First name is required.";
        }
        if (!formState.lastName.trim()) {
            next.lastName = "Last name is required.";
        }
        if (!formState.email.trim()) {
            next.email = "Email is required.";
        } else if (!EMAIL_REGEX.test(formState.email.trim())) {
            next.email = "Enter a valid email address.";
        }
        setErrors(next);
        return next;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) return;

        setSubmitting(true);
        try {
            // ------------------------------------------------------------------
            // This identifies the event by SLUG in the URL (not an explicit
            // `eventId` body field), matching how RegistrationForm.tsx already
            // calls it. Calls it with event.slug AND also include `eventId` inside `formData`
            // redundantly, in case this simpler signup flow's handler expects
            // it explicitly.
            // ------------------------------------------------------------------
            const payload: RegistrationSubmitRequest = {
                uploadSessionId:
                    typeof crypto !== "undefined" && crypto.randomUUID
                        ? crypto.randomUUID()
                        : `${Date.now()}`,
                formData: {
                    eventId: event.id,
                    firstName: formState.firstName.trim(),
                    lastName: formState.lastName.trim(),
                    email: formState.email.trim(),
                    emailNotifications: formState.emailNotifications,
                },
            };

            await publicApi.submitRegistration(event.slug, payload);

            setSuccess(true);
            onSuccess?.();


        } catch (err) {
            console.error("Registration submission failed:", err);
            setError("Failed to submit registration. Please try again.");

        } finally {
            setSubmitting(false);
        }
    };

    if (isClosed) {
        return (
            <div className="w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-primary">
                    {event.title}
                </h2>
                <Alert className="mt-4 border-amber-300 bg-amber-50 text-amber-900">
                    <AlertTitle>Registration is closed</AlertTitle>
                    <AlertDescription>
                        {deadlineDisplay
                            ? `Registration closed on ${deadlineDisplay}.`
                            : "This event is no longer accepting registrations."}
                    </AlertDescription>
                </Alert>
                {onClose && (
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-4 w-full"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="mb-5 space-y-2">
                <h2 className="text-xl font-semibold text-primary">
                    Thank you for showing interest in {event.title}
                </h2>
                <div className="space-y-1 text-sm text-muted-foreground">
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
                </div>
            </div>

            {success ? (
                <div className="space-y-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
                    <div className="inline-flex items-center gap-2 font-semibold">
                        <CircleCheck className="h-5 w-5 text-emerald-600" />
                        <span>Check your email!</span>
                    </div>

                    <p>
                        We&apos;ll be sending a confirmation link to{" "}
                        <span className="font-semibold">
                            {formState.email}
                        </span>
                        . Please check your inbox to confirm your registration.
                        We&apos;ll keep in touch with more details about the event!
                    </p>
                </div>
            ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <FieldSet className="space-y-4">
                        <FieldGroup className="space-y-4">
                            <Field>
                                <FieldLabel>First Name</FieldLabel>
                                <FieldContent>
                                    <Input
                                        type="text"
                                        value={formState.firstName}
                                        disabled={submitting}
                                        onChange={(e) =>
                                            handleChange("firstName", e.target.value)
                                        }
                                    />
                                    <FieldError
                                        errors={
                                            errors.firstName
                                                ? [{ message: errors.firstName }]
                                                : []
                                        }
                                    />
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldLabel>Last Name</FieldLabel>
                                <FieldContent>
                                    <Input
                                        type="text"
                                        value={formState.lastName}
                                        disabled={submitting}
                                        onChange={(e) =>
                                            handleChange("lastName", e.target.value)
                                        }
                                    />
                                    <FieldError
                                        errors={
                                            errors.lastName
                                                ? [{ message: errors.lastName }]
                                                : []
                                        }
                                    />
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <FieldContent>
                                    <Input
                                        type="email"
                                        value={formState.email}
                                        disabled={submitting}
                                        onChange={(e) =>
                                            handleChange("email", e.target.value)
                                        }
                                    />
                                    <FieldError
                                        errors={
                                            errors.email ? [{ message: errors.email }] : []
                                        }
                                    />
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <label className="flex items-center gap-3 text-sm text-foreground">
                                        <Checkbox
                                            checked={formState.emailNotifications}
                                            disabled={submitting}
                                            onCheckedChange={(checked) =>
                                                handleChange(
                                                    "emailNotifications",
                                                    checked === true
                                                )
                                            }
                                        />
                                        <span>
                                            I would like to receive email notifications
                                            about this event.
                                        </span>
                                    </label>
                                </FieldContent>
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing up...
                            </span>
                        ) : (
                            "SIGN UP"
                        )}
                    </Button>
                </form>
            )}
        </div>
    );
}
