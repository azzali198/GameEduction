import React, { useCallback, useEffect, useRef, useState } from 'react';
import './SpinWheel.css';

const segments = [
  '\u24EA Modern Physics',
  '\u2460 Mechanics',
  '\u2461 Relativity',
  '\u2462 Thermodynamics',
  '\u2463 Optic',
  '\u2464 Electromagnetism'
];

const segColors = ['#ff2d35', '#f7ce51', '#815cd1', '#12a9dc', '#00a855', '#ffa90b'];
const twoPi = Math.PI * 2;

const getWheelSize = () => {
  const horizontalSpace = (window.innerWidth - 32) / 2;
  const verticalSpace = (window.innerHeight - 170) / 2;

  return Math.max(80, Math.min(250, horizontalSpace, verticalSpace));
};

const fitFontSize = (context, text, preferredSize, maxWidth) => {
  let fontSize = preferredSize;
  context.font = `700 ${fontSize}px Arial`;

  while (fontSize > 9 && context.measureText(text).width > maxWidth) {
    fontSize -= 1;
    context.font = `700 ${fontSize}px Arial`;
  }

  return fontSize;
};

const SpinningWheel = ({ onFinishing }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef(0);
  const spinningRef = useRef(false);
  const [wheelSize, setWheelSize] = useState(getWheelSize);

  const drawWheel = useCallback((rotation) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const diameter = wheelSize * 2;
    canvas.width = diameter * pixelRatio;
    canvas.height = diameter * pixelRatio;
    canvas.style.width = `${diameter}px`;
    canvas.style.height = `${diameter}px`;

    const context = canvas.getContext('2d');
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, diameter, diameter);

    const segmentAngle = twoPi / segments.length;
    const center = wheelSize;
    const labelRadius = wheelSize * 0.64;
    const startAngle = -Math.PI / 2;

    segments.forEach((label, index) => {
      const from = startAngle + rotation + index * segmentAngle;
      const to = from + segmentAngle;

      context.beginPath();
      context.moveTo(center, center);
      context.arc(center, center, wheelSize - 5, from, to);
      context.closePath();
      context.fillStyle = segColors[index];
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#07101f';
      context.stroke();

      const labelAngle = from + segmentAngle / 2;
      context.save();
      context.translate(
        center + Math.cos(labelAngle) * labelRadius,
        center + Math.sin(labelAngle) * labelRadius
      );
      context.rotate(labelAngle + (Math.cos(labelAngle) < 0 ? Math.PI : 0));
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#ffffff';
      context.shadowColor = 'rgba(0, 0, 0, 0.45)';
      context.shadowBlur = 2;
      const fontSize = fitFontSize(context, label, Math.max(10, wheelSize * 0.095), wheelSize * 0.72);
      context.font = `700 ${fontSize}px Arial`;
      context.fillText(label, 0, 0);
      context.restore();
    });

    context.beginPath();
    context.arc(center, center, Math.max(28, wheelSize * 0.22), 0, twoPi);
    context.fillStyle = '#050b1a';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#ffffff';
    context.stroke();
    context.fillStyle = '#ffffff';
    context.font = `700 ${Math.max(10, wheelSize * 0.085)}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Choose', center, center);

    context.save();
    context.translate(center, 5);
    context.beginPath();
    context.moveTo(-12, 0);
    context.lineTo(12, 0);
    context.lineTo(0, 18);
    context.closePath();
    context.fillStyle = '#ffffff';
    context.fill();
    context.restore();
  }, [wheelSize]);

  useEffect(() => {
    drawWheel(rotationRef.current);
  }, [drawWheel]);

  useEffect(() => {
    const updateWheelSize = () => setWheelSize(getWheelSize());
    window.addEventListener('resize', updateWheelSize);
    window.addEventListener('orientationchange', updateWheelSize);

    return () => {
      window.removeEventListener('resize', updateWheelSize);
      window.removeEventListener('orientationchange', updateWheelSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const spin = () => {
    if (spinningRef.current) return;

    spinningRef.current = true;
    const winnerIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = twoPi / segments.length;
    const currentRotation = rotationRef.current % twoPi;
    const landingRotation = -(winnerIndex + 0.5) * segmentAngle;
    const remainingRotation = (landingRotation - currentRotation + twoPi) % twoPi;
    const startRotation = rotationRef.current;
    const targetRotation = startRotation + twoPi * 5 + remainingRotation;
    const duration = 3200;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      rotationRef.current = startRotation + (targetRotation - startRotation) * easedProgress;
      drawWheel(rotationRef.current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        spinningRef.current = false;
        onFinishing(segments[winnerIndex]);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="spinning-wheel" role="dialog" aria-modal="true" aria-label="Choose a physics topic">
      <canvas
        ref={canvasRef}
        className="spinning-wheel-canvas"
        role="button"
        tabIndex="0"
        aria-label="Spin the wheel to choose a physics topic"
        onClick={spin}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            spin();
          }
        }}
      />
    </div>
  );
};

export default SpinningWheel;
