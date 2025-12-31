import {
    PublicEventDetail,
    RegistrationSubmitRequest,
    RegistrationSubmitResponse,
    RsvpConfirmResponse,
    RsvpDeclineResponse,
    RsvpDetailsResponse,
    UploadFileDeleteRequest,
    UploadFileRequest,
    UploadFileResponse,
} from '@/types/registration';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

type ApiEventResponse = {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    dateTime?: string;
    location?: string | null;
    registrationDeadline?: string | null;
    registrationFormSchema?: unknown;
};

type ApiEventsResponse = {
    events: ApiEventResponse[];
};

function mapEvent(apiEvent: ApiEventResponse): PublicEventDetail {
    const registrationFormSchema = apiEvent.registrationFormSchema as
        PublicEventDetail['registrationFormSchema'];

    return {
        id: apiEvent.id,
        slug: apiEvent.slug,
        title: apiEvent.title,
        description: apiEvent.description ?? null,
        dateTime: apiEvent.dateTime ?? null,
        location: apiEvent.location ?? null,
        registrationDeadline: apiEvent.registrationDeadline ?? null,
        registrationFormSchema: registrationFormSchema ?? null,
    };
}

async function publicRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const detail = await res.json().catch(() => null);
        const message =
            typeof detail?.detail === 'string'
                ? detail.detail
                : `Request failed (${res.status})`;
        throw new Error(message);
    }

    if (res.status === 204) return undefined as T;
    return res.json();
}

export const publicApi = {
    async fetchPublishedEvents(): Promise<PublicEventDetail[]> {
        const data = await publicRequest<ApiEventsResponse>('/events?status=published');
        return (data.events || []).map(mapEvent);
    },

    async getEventBySlug(slug: string): Promise<PublicEventDetail | null> {
        const events = await this.fetchPublishedEvents();
        return events.find((event) => event.slug === slug) ?? null;
    },

    async uploadRegistrationFile(
        slug: string,
        payload: UploadFileRequest
    ): Promise<UploadFileResponse> {
        return publicRequest<UploadFileResponse>(`/events/${slug}/upload-file`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },

    async submitRegistration(
        slug: string,
        payload: RegistrationSubmitRequest
    ): Promise<RegistrationSubmitResponse> {
        return publicRequest<RegistrationSubmitResponse>(`/events/${slug}/register`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },

    async deleteRegistrationFile(
        slug: string,
        fileId: string,
        payload: UploadFileDeleteRequest
    ): Promise<{ success: boolean }> {
        return publicRequest<{ success: boolean }>(
            `/events/${slug}/upload-file/${fileId}`,
            {
                method: 'DELETE',
                body: JSON.stringify(payload),
            }
        );
    },

    async getRsvpDetails(registrationId: string): Promise<RsvpDetailsResponse> {
        return publicRequest<RsvpDetailsResponse>(`/rsvp/${registrationId}`);
    },

    async confirmRsvp(registrationId: string): Promise<RsvpConfirmResponse> {
        return publicRequest<RsvpConfirmResponse>(
            `/rsvp/${registrationId}/confirm`,
            {
                method: 'POST',
            }
        );
    },

    async declineRsvp(registrationId: string): Promise<RsvpDeclineResponse> {
        return publicRequest<RsvpDeclineResponse>(
            `/rsvp/${registrationId}/decline`,
            {
                method: 'POST',
            }
        );
    },
};
