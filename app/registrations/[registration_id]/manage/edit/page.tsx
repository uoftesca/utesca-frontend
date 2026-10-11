"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { RegistrationForm } from "@/components/pages/events/RegistrationForm";
import { RegistrationPageShell } from "@/components/pages/registrations/RegistrationPageShell";
import { publicApi } from "@/lib/public-api";
import { canEditRegistration } from "@/lib/registration-status";
import { EditableApplicationResponse, RegistrationFormMode } from "@/types/registration";

export default function EditRegistrationPage() {
  const { registration_id: registrationId } = useParams<{ registration_id: string }>();
  const router = useRouter();
  const started = useRef(false);
  const [application, setApplication] = useState<EditableApplicationResponse | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    publicApi.getEditableApplication(registrationId)
      .then((result) => {
        if (!canEditRegistration(result.registration.status)) {
          router.replace(`/registrations/${registrationId}/manage`);
          return;
        }
        setApplication(result);
      })
      .catch(() => router.replace("/registrations/invalid-token"));
  }, [registrationId, router]);

  if (!application) {
    return <RegistrationPageShell><p className="text-muted-foreground">Loading your application...</p></RegistrationPageShell>;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto flex justify-center px-8 py-16 md:py-24">
        <RegistrationForm
          event={application.event}
          slug={application.event.slug}
          mode={RegistrationFormMode.Edit}
          registrationId={registrationId}
          initialValues={application.registration.formData}
        />
      </div>
    </main>
  );
}
