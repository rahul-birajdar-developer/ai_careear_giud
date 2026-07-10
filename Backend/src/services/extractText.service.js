import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const extractResumeText = async (filePath, mimeType) => {

    if (mimeType === "application/pdf") {

        const buffer = fs.readFileSync(filePath);

        const data = await pdfParse(buffer);

        return data.text;
    }

    if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

        const result = await mammoth.extractRawText({
            path: filePath,
        });

        return result.value;
    }

    if (mimeType === "text/plain") {

        return fs.readFileSync(filePath, "utf-8");
    }

    throw new Error("Unsupported file type");
};