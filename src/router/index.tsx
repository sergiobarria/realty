import * as React from 'react';

import { Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/HomePage';

export default function index() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}
