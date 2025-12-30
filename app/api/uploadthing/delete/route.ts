import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(request: Request) {
    try {
        const { fileKey } = await request.json();
        if (!fileKey || typeof fileKey !== "string") {
            return NextResponse.json(
                { success: false, error: "fileKey is required" },
                { status: 400 }
            );
        }

        await utapi.deleteFiles([fileKey]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to delete file in UploadThing",
            },
            { status: 500 }
        );
    }
}
