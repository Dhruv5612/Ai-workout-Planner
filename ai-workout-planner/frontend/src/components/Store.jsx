import React from 'react';

function Store() {
  const products = [
    { name: 'Ultra Whey Isolate (Vanilla)', price: '$34.99', badge: '🔥 Bestseller', icon: '🥛' },
    { name: 'Heavy Grip Resistance Bands', price: '$19.99', badge: '⚡ High Elasticity', icon: '🎗️' },
    { name: 'Non-Slip High Density Yoga Mat', price: '$24.99', badge: '✦ Eco TPE', icon: '🧘' },
    { name: 'Steel Shaker Bottle (750ml)', price: '$14.99', badge: '💧 Insulated', icon: '🍼' }
  ];

  return (
    <div>
      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.5rem', color: '#00f5ff' }}>
        🛍️ Curated Equipment
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map((p, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderRadius: '18px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
              <div>
                <strong style={{ color: '#fff', fontSize: '0.98rem', display: 'block' }}>{p.name}</strong>
                <small style={{ color: '#00f5a0', fontWeight: '700' }}>{p.badge}</small>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem' }}>{p.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
