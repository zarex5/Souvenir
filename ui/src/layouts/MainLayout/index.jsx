import React from 'react';
import { Outlet } from 'react-router-dom';
import UpperNavbar from './UpperNavbar';

export default function MainLayout() {
  return (
    <div>
      <UpperNavbar />
      <Outlet />
    </div>
  )
}