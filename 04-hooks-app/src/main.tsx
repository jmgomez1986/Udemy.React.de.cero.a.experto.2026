import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import { HooksApp } from './HooksApp';
// import { TrafficLight } from './01-useState/TrafficLight';
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect';
// import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook';
// import { PokemonPage } from './03-examples/PokemonPage';
// import { FocusScreen } from './04-useRef/FocusScreen';
// import { TasksAppWithUseState } from './05-useReducer/TaskAppWithUseState';
// import { TasksAppWithUseReducer } from './05-useReducer/TaskAppWithUseReducer';
// import { ScrambleWords } from './05-useReducer/ScrumbleWords';
import { ScrumbleWordsWithReducer } from './05-useReducer/ScrumbleWordsWithReducer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksAppWithUseState /> */}
    {/* <TasksAppWithUseReducer /> */}
    {/* <ScrambleWords /> */}
    <ScrumbleWordsWithReducer />
  </StrictMode>,
);
