'use client';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; // Asegúrate de que esta ruta sea correcta

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
