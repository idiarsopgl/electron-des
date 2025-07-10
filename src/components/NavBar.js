import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav style={{ background: '#f5f7fa', padding: '16px 32px', display: 'flex', gap: 24, alignItems: 'center', borderBottom: '1px solid #eee' }}>
    <Link to="/" style={{ fontWeight: 'bold', fontSize: 24, color: '#1976d2', textDecoration: 'none' }}>KIT</Link>
    <Link to="/login">Login</Link>
    <Link to="/admin-dashboard">Admin Dashboard</Link>
  </nav>
);

export default NavBar;
