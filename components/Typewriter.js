import React, { useState, useEffect } from 'react';
import './Typewriter.css';

export default function Typewriter({ text = '', speed = 50, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    function tick(idx) {
      if (idx < text.length) {
        setDisplayed(prev => prev + text[idx]);
        setTimeout(() => tick(idx + 1), speed);
      } else {
        setDone(true);
      }
    }

    const starter = setTimeout(() => tick(0), delay);
    return () => clearTimeout(starter);
  }, [text, speed, delay]);

  return (
      <span className="typewriter-wrapper">
        <span className="typewriter-measure">{text}</span>

      <span className="typewriter">
        {displayed}
        <span className={`cursor${done ? ' blink' : ''}`} />
      </span>
    </span>
  );
}


