import fs from "fs";
import PDFParser from "pdf2json";
import mammoth from "mammoth";

export const extractResumeText = async (filePath, mimeType) => {

    if (mimeType === "application/pdf") {

        const pdfParser = new PDFParser();

        return new Promise((resolve, reject) => {

            pdfParser.on("pdfParser_dataError", (err) => {
                reject(err);
            });

            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                let text = "";

                pdfData.Pages.forEach((page) => {
                    page.Texts.forEach((item) => {
                        item.R.forEach((r) => {
                            try {
                                text += decodeURIComponent(r.T) + " ";
                            } catch (error) {
                                text += r.T + " ";
                            }
                        });
                    });

                    text += "\n";
                });

                resolve(text);

            });

            pdfParser.loadPDF(filePath);

        });
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
        return fs.readFileSync(filePath, "utf8");
    }

    throw new Error("Unsupported file type");
};