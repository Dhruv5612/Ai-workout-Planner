import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Yo! I am your AI Coach ✦ Ask me anything about form cues, rep ranges, or macro nutrition.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          sender: 'ai', 
          text: `Solid question! For ${userMsg.toLowerCase().includes('protein') ? 'protein synthesis' : 'optimal hypertrophy'}, focus on hitting 1.6-2.2g/kg bodyweight and train within 1-2 RIR with strict tempo. You got this! ⚡` 
        }
      ]);
    }, 700);
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '420px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🤖</span>
        <div>
          <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: '800' }}>Planfit AI Trainer</h4>
          <span style={{ fontSize: '0.75rem', color: '#00f5a0', fontWeight: '700' }}>● ONLINE & READY</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem', paddingRight: '0.5rem' }}>
        {messages.map((m, idx) => (
          <div 
            key={idx}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              background: m.sender === 'user' ? 'linear-gradient(135deg, #00f5ff, #00f5a0)' : 'rgba(255,255,255,0.06)',
              color: m.sender === 'user' ? '#07090e' : '#fff',
              fontWeight: m.sender === 'user' ? '700' : '500',
              padding: '0.75rem 1.1rem',
              borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              maxWidth: '80%',
              fontSize: '0.92rem',
              lineHeight: '1.5'
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask AI trainer for cues or advice..."
          style={{
            flex: 1,
            padding: '0.75rem 1.1rem',
            borderRadius: '9999px',
            background: 'rgba(10, 14, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            outline: 'none',
            fontSize: '0.92rem'
          }}
        />
        <button type="submit" className="spatial-btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
          Send ✦
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
