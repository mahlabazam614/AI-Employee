import React from 'react';
import fs from 'fs';
import path from 'path';

export default async function FinancePage() {
    const vaultPath = path.join(process.cwd(), 'AI_Employee_Vault');
    const briefingsPath = path.join(vaultPath, 'Briefings');

    const getBriefings = () => {
        try {
            if (!fs.existsSync(briefingsPath)) return [];
            return fs.readdirSync(briefingsPath)
                .filter(f => f.endsWith('.md'))
                .sort((a, b) => b.localeCompare(a));
        } catch { return []; }
    };

    const briefings = getBriefings();

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Business <span className="gradient-text">Finance</span></h1>
                <p style={{ opacity: 0.6 }}>Financial oversight and CEO briefings.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                <div className="glass-card">
                    <h3>Current P&L</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ opacity: 0.6 }}>Est. Revenue (MTD)</span>
                            <span style={{ fontWeight: 600, color: '#00d382' }}>$4,500.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ opacity: 0.6 }}>Active Subscriptions</span>
                            <span style={{ fontWeight: 600 }}>12</span>
                        </div>
                        <div style={{ height: '1px', background: 'var(--card-border)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                            <span>Net Position</span>
                            <span className="gradient-text" style={{ fontWeight: 700 }}>$3,840.00</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <h3>Generated Briefings</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {briefings.length > 0 ? briefings.map((file, idx) => (
                            <div key={idx} style={{
                                padding: '1rem',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--card-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span>{file.replace('.md', '').split('_').join(' ')}</span>
                                <button style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--card-border)',
                                    color: 'white',
                                    padding: '0.3rem 0.7rem',
                                    borderRadius: '0.4rem',
                                    fontSize: '0.8rem'
                                }}>Read</button>
                            </div>
                        )) : <p style={{ opacity: 0.4 }}>No briefings generated yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
