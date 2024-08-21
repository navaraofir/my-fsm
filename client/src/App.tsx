import React, { useState, useCallback, useEffect } from 'react';
import TrafficLight from './components/trafficLight/trafficLight';
import Toggle from './components/toggle/toggle';
import styles from './App.module.scss';
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";

const regularTrafficLightPath = 'http://localhost:3000/regular-traffic-light';
const awesomeTrafficLightPath = 'http://localhost:3000/awesome-traffic-light';

const App: React.FC = () => {
  const [start, setStart] = useState(true);
  const [lightConfig, setLightConfig] = useState(null);

  const fetchStyle = (isRegular: boolean) => {
    fetch(isRegular ? regularTrafficLightPath : awesomeTrafficLightPath).then(response => response.json().then(lightConfig => {
      setLightConfig(lightConfig);
    }))
  }

  useEffect(() => {
    fetchStyle(true);
  }, []);

  const toggleStart = () => {
    setStart(!start);
  }

  const onStyleChange = useCallback((isRegular: boolean) => {
    fetchStyle(isRegular);
  }, []);

  return (
    <div className={styles.App}>
      <h1 className={styles.title}>My traffic light</h1>
      <Toggle onToggle={onStyleChange}/>

      {lightConfig && <TrafficLight isStarted={start} trafficLightConfig={lightConfig}/>}
      
      <div className={styles.button}>
        <button onClick={toggleStart}>
          {!start && <FaRegPlayCircle size={40} />}
          {start && <FaRegPauseCircle size={40} />}
        </button>
      </div>
    </div>
  );
};

export default App;
