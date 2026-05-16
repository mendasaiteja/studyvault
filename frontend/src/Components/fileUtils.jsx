export const getTheme = (subject = '') => {
    const s = subject.toLowerCase();
    if (s.includes('math')) return { border: '#534AB7', text: '#9f97e8', bg: '#12101e', fill: '#1e1a3a', line: '#534AB7', badge: '#2a2250' };
    if (s.includes('bio')) return { border: '#1D9E75', text: '#1D9E75', bg: '#101a14', fill: '#1a2a22', line: '#1D9E75', badge: '#0a1f14' };
    if (s.includes('physics')) return { border: '#D85A30', text: '#D85A30', bg: '#1a1008', fill: '#2a1a0a', line: '#D85A30', badge: '#1a0e06' };
    if (s.includes('cs') || s.includes('computer')) return { border: '#378ADD', text: '#378ADD', bg: '#0e1420', fill: '#0e1a2a', line: '#378ADD', badge: '#091422' };
    if (s.includes('chem')) return { border: '#D4537E', text: '#D4537E', bg: '#160f1e', fill: '#1e1028', line: '#D4537E', badge: '#1e0e28' };
    if (s.includes('eco') || s.includes('science')) return { border: '#639922', text: '#97C459', bg: '#0e1a12', fill: '#0e1e14', line: '#639922', badge: '#081408' };
    return { border: '#534AB7', text: '#9f97e8', bg: '#12101e', fill: '#1e1a3a', line: '#534AB7', badge: '#2a2250' };
};

export function BookArt({ subject, theme }) {
    const s = subject.toLowerCase();

    if (s.includes('cs') || s.includes('computer')) return (
        <svg width="72" height="82" viewBox="0 0 72 82" fill="none">
            <rect x="6" y="5" width="60" height="72" rx="4" fill={theme.fill} stroke={theme.border} strokeWidth="1.2" />
            <rect x="13" y="14" width="46" height="3" rx="1" fill={theme.line} opacity=".85" />
            <rect x="13" y="21" width="36" height="2" rx="1" fill={theme.line} opacity=".5" />
            <rect x="13" y="26" width="42" height="2" rx="1" fill={theme.line} opacity=".4" />
            <rect x="13" y="40" width="46" height="20" rx="2" fill={theme.badge} stroke={theme.border} strokeWidth=".8" />
            <text x="36" y="54" fontSize="10" fill={theme.text} textAnchor="middle" fontFamily="monospace">{"{ }"}</text>
        </svg>
    );

    if (s.includes('bio')) return (
        <svg width="72" height="82" viewBox="0 0 72 82" fill="none">
            <rect x="6" y="5" width="60" height="72" rx="4" fill={theme.fill} stroke={theme.border} strokeWidth="1.2" />
            <rect x="13" y="14" width="46" height="3" rx="1" fill={theme.line} opacity=".85" />
            <rect x="13" y="21" width="32" height="2" rx="1" fill={theme.line} opacity=".5" />
            <rect x="13" y="26" width="38" height="2" rx="1" fill={theme.line} opacity=".4" />
            <rect x="20" y="38" width="32" height="20" rx="2" fill={theme.badge} stroke={theme.border} strokeWidth=".8" />
            <line x1="26" y1="48" x2="46" y2="48" stroke={theme.line} strokeWidth=".8" opacity=".7" />
            <line x1="26" y1="52" x2="42" y2="52" stroke={theme.line} strokeWidth=".8" opacity=".5" />
        </svg>
    );

    if (s.includes('physics')) return (
        <svg width="72" height="82" viewBox="0 0 72 82" fill="none">
            <rect x="6" y="5" width="60" height="72" rx="4" fill={theme.fill} stroke={theme.border} strokeWidth="1.2" />
            <rect x="13" y="14" width="46" height="3" rx="1" fill={theme.line} opacity=".85" />
            <rect x="13" y="21" width="30" height="2" rx="1" fill={theme.line} opacity=".5" />
            <rect x="13" y="26" width="38" height="2" rx="1" fill={theme.line} opacity=".4" />
            <circle cx="36" cy="52" r="12" fill={theme.badge} stroke={theme.border} strokeWidth=".8" />
            <circle cx="36" cy="52" r="4" fill={theme.line} opacity=".7" />
        </svg>
    );

    if (s.includes('chem')) return (
        <svg width="72" height="82" viewBox="0 0 72 82" fill="none">
            <rect x="6" y="5" width="60" height="72" rx="4" fill={theme.fill} stroke={theme.border} strokeWidth="1.2" />
            <rect x="13" y="14" width="46" height="3" rx="1" fill={theme.line} opacity=".85" />
            <rect x="13" y="21" width="28" height="2" rx="1" fill={theme.line} opacity=".5" />
            <rect x="13" y="26" width="36" height="2" rx="1" fill={theme.line} opacity=".4" />
            <path d="M36 62 L36 42 M29 49 L36 42 L43 49" stroke={theme.line} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="26" y1="64" x2="46" y2="64" stroke={theme.line} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );

    if (s.includes('eco') || s.includes('science')) return (
        <svg width="72" height="82" viewBox="0 0 72 82" fill="none">
            <rect x="6" y="5" width="60" height="72" rx="4" fill={theme.fill} stroke={theme.border} strokeWidth="1.2" />
            <rect x="13" y="14" width="46" height="3" rx="1" fill={theme.line} opacity=".85" />
            <rect x="13" y="21" width="28" height="2" rx="1" fill={theme.line} opacity=".5" />
            <rect x="20" y="36" width="32" height="32" rx="16" fill={theme.badge} stroke={theme.border} strokeWidth=".8" />
            <line x1="36" y1="36" x2="36" y2="68" stroke={theme.line} strokeWidth=".8" opacity=".6" />
            <line x1="20" y1="52" x2="52" y2="52" stroke={theme.line} strokeWidth=".8" opacity=".6" />
        </svg>
    );

    return (
        <svg width="72" height="82" viewBox="0 0 72 82" fill="none">
            <rect x="6" y="5" width="60" height="72" rx="4" fill={theme.fill} stroke={theme.border} strokeWidth="1.2" />
            <rect x="13" y="14" width="46" height="3" rx="1" fill={theme.line} opacity=".85" />
            <rect x="13" y="21" width="36" height="2" rx="1" fill={theme.line} opacity=".5" />
            <rect x="13" y="26" width="42" height="2" rx="1" fill={theme.line} opacity=".4" />
            <rect x="13" y="31" width="30" height="2" rx="1" fill={theme.line} opacity=".3" />
            <rect x="13" y="48" width="18" height="12" rx="2" fill={theme.badge} stroke={theme.border} strokeWidth=".8" />
            <text x="22" y="57" fontSize="6.5" fill={theme.text} textAnchor="middle" fontFamily="monospace">PDF</text>
        </svg>
    );
}
