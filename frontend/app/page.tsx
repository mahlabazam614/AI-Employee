import React from 'react';
import fs from 'fs';
import path from 'path';
import DashboardClient from './DashboardClient';

export default async function Page() {
    const vaultPath = path.resolve('../AI_Employee_Vault');
    const needsActionPath = path.join(vaultPath, 'Needs_Action');
    const pendingApprovalPath = path.join(vaultPath, 'Pending_Approval');

    const getFiles = (dir: string) => {
        try {
            if (!fs.existsSync(dir)) return [];
            return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
        } catch {
            return [];
        }
    };

    const needsAction = getFiles(needsActionPath);
    const pendingApproval = getFiles(pendingApprovalPath);

    return (
        <DashboardClient
            initialNeedsAction={needsAction}
            initialPendingApproval={pendingApproval}
        />
    );
}
