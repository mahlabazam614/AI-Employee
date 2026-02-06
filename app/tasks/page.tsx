import React from 'react';
import fs from 'node:fs';
import path from 'node:path';

export default async function TasksPage() {
    const vaultPath = path.join(process.cwd(), 'AI_Employee_Vault');
    const needsActionPath = path.join(vaultPath, 'Needs_Action');
    const donePath = path.join(vaultPath, 'Done');

    const getFiles = (dir: string) => {
        try {
            if (!fs.existsSync(dir)) return [];
            return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
        } catch { return []; }
    };

    const tasks = getFiles(needsActionPath);
    const completed = getFiles(donePath);

    // Cloud demo fallback
    const displayTasks = tasks.length === 0 && completed.length === 0
        ? ["Sample_Startup_Task.md"]
        : tasks;

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Active <span className="gradient-text">Tasks</span></h1>
                <p style={{ opacity: 0.6 }}>Manage and track all ongoing AI operations.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-card">
                    <h3>Needs Action ({displayTasks.length})</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {displayTasks.length > 0 ? displayTasks.map((file, idx) => (
                            <div key={idx} style={{
                                padding: '1rem',
                                background: 'rgba(255, 171, 0, 0.05)',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(255, 171, 0, 0.2)',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span>{file.replace('.md', '').split('_').join(' ')}</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Monitoring</span>
                            </div>
                        )) : <p style={{ opacity: 0.4 }}>No active tasks.</p>}
                    </div>
                </div>

                <div className="glass-card">
                    <h3>Completed Tasks ({completed.length})</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {completed.length > 0 ? completed.map((file, idx) => (
                            <div key={idx} style={{
                                padding: '0.75rem 1rem',
                                background: 'rgba(0, 211, 130, 0.03)',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                opacity: 0.7
                            }}>
                                <span>{file.replace('.md', '').split('_').join(' ')}</span>
                                <span style={{ color: '#00d382', fontSize: '0.8rem' }}>DONE</span>
                            </div>
                        )) : <p style={{ opacity: 0.4 }}>No completed tasks yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
