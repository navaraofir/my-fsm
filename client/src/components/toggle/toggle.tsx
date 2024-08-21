import React, { useState } from 'react';
import styles from './toggle.module.scss'

interface ToggleProps {
  onToggle: (isOn: boolean) => void;
  initialState?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onToggle, initialState = true }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState);
  };

  return (
    <button onClick={handleToggle} className={styles.toggle} 
    style={{backgroundColor: !isOn ? 'green' : 'purple'}}>
      {!isOn ? 'Make it Regular' : 'Make it Awesome'}
    </button>
  );
};

export default Toggle;
