import path from 'path';
import fs from 'fs';

export const PROFILE_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
export const PROFILE_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const UPLOAD_FOLDER = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}
