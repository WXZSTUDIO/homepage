import React from 'react';

/* Glass is invisible without something under it to refract. These are the
   blurred colour blooms behind every panel — drifting slowly, and frozen
   entirely when the visitor asks for reduced motion. */
const BLOOMS = [
  {
    className: 'bloom-a',
    style: {
      background: '#4F7CFF',
      width: '46rem',
      height: '46rem',
      top: '-12rem',
      left: '-10rem',
    },
  },
  {
    className: 'bloom-b',
    style: {
      background: '#FF5FA2',
      width: '40rem',
      height: '40rem',
      top: '18rem',
      right: '-12rem',
    },
  },
  {
    className: 'bloom-a',
    style: {
      background: '#8B5CF6',
      width: '38rem',
      height: '38rem',
      top: '62rem',
      left: '18%',
    },
  },
  {
    className: 'bloom-b',
    style: {
      background: '#22D3EE',
      width: '34rem',
      height: '34rem',
      top: '120rem',
      right: '10%',
    },
  },
  {
    className: 'bloom-a',
    style: {
      background: '#FF7A2F',
      width: '32rem',
      height: '32rem',
      top: '180rem',
      left: '6%',
    },
  },
];

const Backdrop: React.FC = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 -z-10 overflow-hidden bg-ink pointer-events-none"
  >
    {BLOOMS.map((bloom, i) => (
      <div
        key={i}
        className={`absolute rounded-full blur-[110px] ${bloom.className}`}
        style={{ ...bloom.style, opacity: 0.38 }}
      />
    ))}

    {/* Vignette: keeps blooms from washing out the type in the centre column */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(120% 80% at 50% 40%, rgba(8,8,11,0.55) 0%, rgba(8,8,11,0.82) 60%, rgba(8,8,11,0.95) 100%)',
      }}
    />
  </div>
);

export default Backdrop;
