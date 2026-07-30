import React from 'react';
import { NavLink } from 'react-router-dom';
import logoSrc from '../../assets/icon.png';

const navItems = [
  { path: '/cpp', label: 'C++' },
  { path: '/python', label: 'Python' },
  { path: '/git', label: 'Git' },
  { path: '/linux', label: 'Linux' },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <NavLink to="/" className="logo">
          <img src={logoSrc} alt="OpenGuido" className="logo-icon" />
          <span className="logo-text">OpenGuido <span className="logo-docs">docs</span></span>
        </NavLink>
        <nav>
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.path}>
                <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
