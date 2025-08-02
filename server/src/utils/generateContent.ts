import DatauriParser from "datauri/parser";
import path from "path";

export const generateContent = (
  buffer: Buffer,
  file: File
): Base64URLString => {
  const parser = new DatauriParser();

  if (!buffer || !file || !file.name) {
    throw new Error("File not found");
  }

  const extName = path.extname(file.name);
  return parser.format(extName, buffer).content!;
};
