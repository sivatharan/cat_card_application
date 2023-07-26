import * as fs from "fs/promises"; // Using const for fs as it is not reassigned
import * as path from "path";

export const writeFile = async (buffer, imageName) => {
  const fileOut = path.join(process.cwd(), imageName);
  await fs.writeFile(fileOut, buffer);
};
