import { useEffect, useState } from "react";
import '../Components/LandingPage/LandingPage.css'

const AnimatedText = ({ text, delay = 200 }) => { // Change default delay to 200ms
    const [displayedText, setDisplayedText] = useState('');
    const wordsArray = text.split(' ');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          const nextWordIndex = prev.split(' ').length;
          if (nextWordIndex >= wordsArray.length) {
            clearInterval(interval);
            return prev; // Stop the interval once all words are shown
          }
          return wordsArray.slice(0, nextWordIndex + 1).join(' ');
        });
      }, delay);
  
      return () => clearInterval(interval);
    }, [wordsArray, delay]);
  
    const className = `p_animated${displayedText.split(' ').length === wordsArray.length ? ' show' : ''}`;
  
    return <p className={className} style={{ textAlign: 'center' }}>{displayedText}</p>;
  };
  
  export default AnimatedText;