import './styles/globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'AI Employee Control Center',
    description: 'Proactive Personal & Business Automation',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="layout">
                    <aside className="sidebar">
                        <h2 className="gradient-text">AI Employee</h2>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link href="/" className="nav-link">Dashboard</Link>
                            <Link href="/tasks" className="nav-link">Tasks</Link>
                            <Link href="/approvals" className="nav-link">Approvals</Link>
                            <Link href="/finance" className="nav-link">Finance</Link>
                        </nav>
                        <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--card-border)' }}>
                            <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>System: Online</p>
                        </div>
                    </aside>
                    <main className="main-content">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
