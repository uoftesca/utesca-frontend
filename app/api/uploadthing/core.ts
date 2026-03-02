import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
    resumeUploader: f({ pdf: { maxFileSize: "8MB" }, image: { maxFileSize: "8MB" } }).onUploadComplete(
        async ({ file }) => {
            return { url: file.ufsUrl };
        }
    ),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
