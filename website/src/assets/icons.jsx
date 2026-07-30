// Professional SVG icon set for OpenGuido Docs
// All icons: 24x24, stroke=1.5, no emojis

export const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

export const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

export const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const CppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="rgba(59,130,246,0.12)"/>
    <text x="24" y="32" fontFamily="system-ui" fontWeight="700" fontSize="20" textAnchor="middle" fill="#3b82f6">C++</text>
  </svg>
);

export const PythonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="rgba(245,158,11,0.12)"/>
    <text x="24" y="32" fontFamily="system-ui" fontWeight="700" fontSize="20" textAnchor="middle" fill="#f59e0b">Py</text>
  </svg>
);

export const GitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="rgba(239,68,68,0.12)"/>
    <text x="24" y="32" fontFamily="system-ui" fontWeight="700" fontSize="18" textAnchor="middle" fill="#ef4444">Git</text>
  </svg>
);

export const LinuxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="rgba(255,255,255,0.06)"/>
    <text x="24" y="32" fontFamily="system-ui" fontWeight="700" fontSize="16" textAnchor="middle" fill="#e8e8ed">Ln</text>
  </svg>
);

export const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4.5 10h11m-4-4l4 4-4 4"/>
  </svg>
);

export const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
  </svg>
);

export const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="#f59e0b"/>
    <text x="14" y="19.5" fontFamily="system-ui" fontWeight="800" fontSize="16" textAnchor="middle" fill="#0a0a0f">O</text>
  </svg>
);

export const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export const VSCodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 3l5 5-5 5M7.5 21l-5-5 5-5" opacity="0.4"/><path d="M21 8H7.5a4.5 4.5 0 000 9H12"/><path d="M7.5 8v13"/>
  </svg>
);

export const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// Language badge SVG icons
export const BadgeIcon = ({ lang }) => {
  const colors = { cpp: '#3b82f6', python: '#f59e0b', git: '#ef4444', linux: '#8888a0' };
  const color = colors[lang] || '#8888a0';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 18" style={{ width: 40, height: 18 }}>
      <rect width="40" height="18" rx="3" fill={color} fillOpacity="0.12"/>
      <text x="20" y="13" fontFamily="system-ui" fontWeight="600" fontSize="10" textAnchor="middle" fill={color} textTransform="uppercase">
        {lang}
      </text>
    </svg>
  );
};
