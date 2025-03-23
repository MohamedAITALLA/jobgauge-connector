
import React, { useEffect } from 'react';

interface ConfettiEffectProps {
  show: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ show }) => {
  // Announce to screen readers when confetti appears
  useEffect(() => {
    if (show) {
      // Create an accessible announcement for screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only'; // Screen reader only
      announcement.textContent = 'Celebration animation playing to mark your successful application';
      document.body.appendChild(announcement);
      
      // Remove the announcement after it's been read
      return () => {
        document.body.removeChild(announcement);
      };
    }
  }, [show]);
  
  if (!show) return null;
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50" 
      aria-hidden="true" // Hide from screen readers as it's purely decorative
      role="presentation"
    >
      {/* Simple CSS confetti simulation */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#3b82f6', '#4f46e5', '#8b5cf6', '#ec4899', '#f59e0b'][
              Math.floor(Math.random() * 5)
            ],
            animation: `confetti ${1 + Math.random() * 2}s linear forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        /* Add a class for screen-reader only elements */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </div>
  );
};

export default ConfettiEffect;
