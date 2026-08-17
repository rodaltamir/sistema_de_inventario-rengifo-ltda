import fs from "fs/promises";
import path from "path";

export async function saveBase64Image(base64Str: string, prefix: string): Promise<string> {
  if (!base64Str || !base64Str.startsWith('data:image')) {
    return base64Str;
  }

  const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return base64Str;
  }

  const ext = matches[1].split('/')[1] || 'png';
  const buffer = Buffer.from(matches[2], 'base64');
  const filename = `${prefix}-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  } catch (e) {
    console.error("Error saving image:", e);
    return base64Str; // Fallback to base64 if save fails
  }
}
