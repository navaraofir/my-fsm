import { useState, useCallback } from 'react';

type State = string;
type Event = string;

export interface Transition {
  event: Event;
  target: State;
}

export interface StateMachineConfig {
  [state: string]: Transition[];
}

export interface FSM<T extends StateMachineConfig> {
  currentState: keyof T;
  transition: (event: Event) => void;
  canTransition: (event: Event) => boolean;
}

function useFSM<T extends StateMachineConfig>(config: T, initialState: keyof T): FSM<T> {
  const [currentState, setCurrentState] = useState(initialState);

  const transition = useCallback(
    (event: Event) => {
      const transitions = config[currentState];
      const transition = transitions.find(t => t.event === event);
      if (transition) {
        setCurrentState(transition.target);
      }
    },
    [currentState, config]
  );

  const canTransition = useCallback(
    (event: Event) => {
      const transitions = config[currentState];
      return transitions.some(t => t.event === event);
    },
    [currentState, config]
  );

  return {
    currentState,
    transition,
    canTransition,
  };
}

export { useFSM }