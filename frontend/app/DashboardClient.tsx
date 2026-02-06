'use client';

import React, { useState, useEffect } from 'react';
import { approveTask } from './actions';

export default function DashboardClient({
    initialNeedsAction,
    initialPendingApproval
}: {
    initialNeedsAction: string[],
    initialPendingApproval: string[]
}) {
    const [needsAction, setNeedsAction] = useState(initialNeedsAction);
    const [pendingApproval, setPendingApproval] = useState(initialPendingApproval);

    const handleApprove = async (filename: string) => {
        const result = await approveTask(filename);
        if (result.success) {
            setPendingApproval(prev => prev.filter(f => f !== filename));
            alert('Action Approved! The AI Employee is now executing the task.');
        } else {
            alert('Error approving task: ' + result.error);
        }
    };

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Good Afternoon, <span className="gradient-text">Creator</span></h1>
                <p style={{ opacity: 0.6 }}>Your Digital FTE is currently monitoring {needsAction.length + pendingApproval.length} active signals.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="glass-card">
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weekly Revenue</p>
                    <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>$2,450.00</h2>
                    <div style={{ marginTop: '1rem', color: '#00d382', fontSize: '0.9rem' }}>+12% from last week</div>
                </div>

                <div className="glass-card">
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Active Signals</p>
                    <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{needsAction.length}</h2>
                    <div style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{pendingApproval.length} Require HITL Approval</div>
                </div>

                <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
                    <h3>Recent Signals (Needs Action)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        {needsAction.length > 0 ? needsAction.map((file, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--card-border)'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span className="badge badge-pending" style={{ background: 'rgba(255, 171, 0, 0.1)', color: '#ffab00', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem' }}>Signal</span>
                                    <span style={{ fontWeight: 500 }}>{file.replace('.md', '').split('_').join(' ')}</span>
                                </div>
                                <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>Monitoring...</span>
                            </div>
                        )) : <p style={{ opacity: 0.4 }}>No pending signals in vault.</p>}
                    </div>
                </div>

                <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
                    <h3>Pending Approvals</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {pendingApproval.length > 0 ? pendingApproval.map((file, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: 'rgba(157, 80, 187, 0.05)',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--secondary)'
                            }}>
                                <span style={{ fontWeight: 500 }}>{file.replace('.md', '').split('_').join(' ')}</span>
                                <button
                                    onClick={() => handleApprove(file)}
                                    style={{
                                        background: 'var(--secondary)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}>Approve Action</button>
                            </div>
                        )) : <p style={{ opacity: 0.4 }}>No items awaiting approval.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
