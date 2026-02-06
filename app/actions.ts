'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function approveTask(filename: string) {
    const vaultPath = path.resolve('./AI_Employee_Vault');
    const pendingPath = path.join(vaultPath, 'Pending_Approval', filename);
    const approvedPath = path.join(vaultPath, 'Approved', filename);

    try {
        if (fs.existsSync(pendingPath)) {
            if (!fs.existsSync(path.join(vaultPath, 'Approved'))) {
                fs.mkdirSync(path.join(vaultPath, 'Approved'));
            }
            fs.renameSync(pendingPath, approvedPath);
            console.log(`Successfully approved: ${filename}`);
            revalidatePath('/');
            return { success: true };
        }
        return { success: false, error: 'File not found' };
    } catch (e) {
        console.error('Approval failed:', e);
        return { success: false, error: String(e) };
    }
}
