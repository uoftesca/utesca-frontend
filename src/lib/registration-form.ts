import type {
  RegistrationFormField,
  RegistrationFormSchema,
} from "@/types/registration";

export function isApplicantEditableField(
  schema: RegistrationFormSchema,
  field: RegistrationFormField,
) {
  return field.type !== "file" && Boolean(schema.editable?.includes(field.id));
}

export function hasApplicantEditableFields(schema?: RegistrationFormSchema | null) {
  return schema?.fields.some((field) => isApplicantEditableField(schema, field)) ?? false;
}
