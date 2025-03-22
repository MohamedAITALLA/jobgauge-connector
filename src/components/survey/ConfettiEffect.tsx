
import React from 'react';

interface ConfettiEffectProps {
  show: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
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
      `}</style>
    </div>
  );
};

export default ConfettiEffect;
