import React from 'react';
import fs from 'fs';
import path from 'path';
import DashboardClient from '../DashboardClient';

export default async function ApprovalsPage() {
    const vaultPath = path.resolve('../AI_Employee_Vault');
    const needsActionPath = path.join(vaultPath, 'Needs_Action');
    const pendingApprovalPath = path.join(vaultPath, 'Pending_Approval');

    const getFiles = (dir: string) => {
        try {
            if (!fs.existsSync(dir)) return [];
            return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
        } catch { return []; }
    };

    const needsAction = getFiles(needsActionPath);
    const pendingApproval = getFiles(pendingApprovalPath);

    // Cloud demo fallback
    const isCloud = needsAction.length === 0 && pendingApproval.length === 0;
    const displayNeedsAction = isCloud ? ["Review_Project_Plan.md"] : needsAction;
    const displayPendingApproval = isCloud ? ["Cloud_Deployment_Approval.md"] : pendingApproval;

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Pending <span className="gradient-text">Approvals</span></h1>
                <p style={{ opacity: 0.6 }}>Human-in-the-Loop authorization for sensitive actions.</p>
            </header>

            <DashboardClient
                initialNeedsAction={displayNeedsAction}
                initialPendingApproval={displayPendingApproval}
            />
        </div>
    );
}
