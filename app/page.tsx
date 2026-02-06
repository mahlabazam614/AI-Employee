import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import DashboardClient from './DashboardClient';

export default async function Page() {
    const vaultPath = path.resolve('./AI_Employee_Vault');
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

    // Fallback for cloud demo
    const isCloud = needsAction.length === 0 && pendingApproval.length === 0;
    const displayNeedsAction = isCloud ? ["Cloud_Sync_Active.md", "System_Ready.md"] : needsAction;
    const displayPendingApproval = isCloud ? ["Welcome_to_AI_Employee.md"] : pendingApproval;

    return (
        <DashboardClient
            initialNeedsAction={displayNeedsAction}
            initialPendingApproval={displayPendingApproval}
        />
    );
}
