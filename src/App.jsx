import React from 'react';
import GlowingHeart from './components/GlowingHeart';
import './App.css'; // O teu ficheiro de estilos globais

export default function App() {
  return (
    <div className="app-container">
      <div className="stage">
        <GlowingHeart />
      </div>
    </div>
  );
}