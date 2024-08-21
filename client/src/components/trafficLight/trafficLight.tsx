import React, { useEffect } from 'react';
import styles from './trafficLight.module.scss';
import { useFSM, Transition, StateMachineConfig } from '../../fsm-lib/fsm';

enum TrafficLightState {
    'red' = 'red',
    'redYellow' = 'redYellow',
    'yellow' = 'yellow',
    'green' = 'green'
}
type TrafficLightConfig = {[key: string]: { next: TrafficLightState; delay: number; color: string; offColor: string;}};

const stateMachineConfig: StateMachineConfig = {
    red: [
        { event: 'stop', target: 'yellow' },
    ],
    yellow: [
        { event: 'prepare-go', target: 'green' },
    ],
    green: [
        { event: 'go', target: 'red' },
    ],
};

interface TrafficLightParams {
    isStarted: boolean;
    trafficLightConfig: TrafficLightConfig;
}

const TrafficLight: React.FC<TrafficLightParams> = ({ isStarted, trafficLightConfig }: TrafficLightParams) => {
    const { currentState, transition } = useFSM(stateMachineConfig, TrafficLightState.red);

    useEffect(() => {
        const state: TrafficLightState = currentState as TrafficLightState;
        const timeout = setTimeout(() => {
            if (isStarted) {
                transition(stateMachineConfig[state][0].event);
            }
        }, trafficLightConfig[state]?.delay);

        return () => clearTimeout(timeout);
    }, [currentState, isStarted]);

    return (
        <div className={styles.trafficLight}>
            <div style={{backgroundColor: currentState === TrafficLightState.red ? trafficLightConfig[currentState].color : trafficLightConfig.red.offColor}} className={styles.light}></div>
            <div style={{backgroundColor: currentState === TrafficLightState.yellow ? trafficLightConfig[currentState].color : trafficLightConfig.yellow.offColor}} className={styles.light}></div>
            <div style={{backgroundColor: currentState === TrafficLightState.green ? trafficLightConfig[currentState].color : trafficLightConfig.green.offColor}} className={styles.light}></div>
        </div>
    );
};

export default TrafficLight;
