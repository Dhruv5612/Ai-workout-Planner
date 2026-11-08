import React from 'react';
import SharedHeader from '../components/SharedHeader';
import Store from '../components/Store';
import ChallengeMode from '../components/ChallengeMode';

function StorePage() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 5vw 5rem', position: 'relative' }}>
      <SharedHeader />
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="genz-pill pink" style={{ marginBottom: '1rem' }}>
            <span>✦ EXCLUSIVE GEAR & COMMUNITY CHALLENGES</span>
          </div>
          <h1 style={{ fontSize: '3.4rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            The Fit Vault & <span className="holo-pink">Challenges</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem' }}>
            Level up your gym kit and compete in weekly community gauntlets.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <ChallengeMode />
          </div>
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <Store />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorePage;
