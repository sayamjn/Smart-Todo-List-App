import React, { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/utils/dateUtils';

interface CountdownProps {
  deadline: string;
  onExpire?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ deadline, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeRemaining(deadline);
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0 && onExpire) {
        onExpire();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [deadline, onExpire]);
  
  // Determine color based on time remaining
  const getColorClass = () => {
    if (timeLeft.isPast) return 'text-red-600';
    if (timeLeft.days > 0) return 'text-green-600';
    if (timeLeft.hours > 5) return 'text-green-600';
    if (timeLeft.hours > 1) return 'text-yellow-600';
    return 'text-orange-600';
  };
  
  if (timeLeft.isPast) {
    return <span className="text-red-600 font-medium">Past deadline</span>;
  }
  
  return (
    <span className={`font-medium ${getColorClass()}`}>
      {timeLeft.days > 0 && `${timeLeft.days}d `}
      {timeLeft.hours > 0 && `${timeLeft.hours}h `}
      {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

export default Countdown;