import DatauriParser from "datauri/parser";
import path from "path";

export const generateContent = (
  buffer: Buffer,
  fileName: string,
): Base64URLString => {
  const parser = new DatauriParser();

  if (!buffer || !fileName) {
    throw new Error("File not found");
  }

  const extName = path.extname(fileName);
  return parser.format(extName, buffer).content!;
};
