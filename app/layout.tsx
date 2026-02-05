import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MrMarrant',
  description: 'A fully interactive virtual television experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=VT323&family=Inter:wght@400;600;800&family=Share+Tech+Mono&display=swap');
          
          body {
            background-color: #1a1a1a;
            margin: 0;
            overflow: hidden;
          }

          /* CRT Screen Effects */
          .crt-screen {
            position: relative;
            overflow: hidden;
          }
          
          .crt-overlay {
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
          }

          .scanline {
            width: 100%;
            height: 100px;
            z-index: 10;
            background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0) 100%);
            opacity: 0.1;
            position: absolute;
            bottom: 100%;
            animation: scanline 10s linear infinite;
            pointer-events: none;
          }

          @keyframes scanline {
            0% { bottom: 100%; }
            100% { bottom: -100px; }
          }

          .screen-glow {
            box-shadow: 0 0 100px rgba(100, 200, 255, 0.15);
          }
          
          @keyframes turn-on {
            0% { transform: scale(1, 0.002); opacity: 0; filter: brightness(30); }
            30% { transform: scale(1, 0.002); opacity: 1; filter: brightness(10); }
            60% { transform: scale(1.1, 0.002); opacity: 1; filter: brightness(2); }
            100% { transform: scale(1, 1); opacity: 1; filter: brightness(1); }
          }
          
          .animate-turn-on {
            animation: turn-on 0.4s ease-out forwards;
          }

          .font-mono-retro {
            font-family: 'VT323', monospace;
          }
          
          .font-tech {
            font-family: 'Share Tech Mono', monospace;
          }

          .font-pixel {
            font-family: 'Press Start 2P', cursive;
          }

          .articles-border {
            border: 6px solid white;
            background: black;
            padding: 1rem;
            position: relative;
          }

          .remote-btn:active {
            transform: scale(0.95);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.4);
          }

          @layer utilities {
          .animated-bg {
            background: linear-gradient(
              270deg,
              #1a1b3dff,
              #1a0941ff,
              #3a0e24ff,
              #5f3c00ff
            );
            background-size: 800% 800%;
            animation: gradientTransition 40s ease infinite;
          }

          @keyframes gradientTransition {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}