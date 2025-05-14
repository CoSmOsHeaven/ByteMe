import React, { useState, useEffect } from 'react';
import './Typewriter.css';

export default function Typewriter({ text = '', speed = 50, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    let ticker;
    // espera inicial antes de empezar a escribir
    const timer = setTimeout(() => {
      ticker = setInterval(() => {
        setDisplayed(prev => prev + text[i]);
        i++;
        if (i >= text.length) {
          clearInterval(ticker);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(ticker);
    };
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


