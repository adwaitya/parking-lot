import { useCallback, useEffect, useState } from 'react'
import { animated, useSpringRef, useTransition } from '@react-spring/web';

import './App.scss'
import { Landing } from './Pages/Landing'
import Main from './Pages/Main/Main';

const pages = [
  ({ style, triggerTransition, setParkingSlotsCount }:any) => (
    <animated.div style={{ ...style, background: "lightgreen" }}>
      <Landing
        triggerTransition={triggerTransition}
        setParkingSlotsCount={setParkingSlotsCount}
      />
    </animated.div>
  ),
  ({ style, slotsCount }: any) => (
    <animated.div style={{ ...style, background: "lightgray" }}>
      <Main slotsCount={slotsCount} />
    </animated.div>
  ),
];


function App() {
  const [parkingSlotsCount, setParkingSlotsCount] = useState(1);

  const [index, set] = useState(0);
  const onClick = useCallback(() => set((state) => (state + 1) % 2), []);
  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  useEffect(() => {
    transRef.start();
  }, [index]);

  return (
    <div className={`flex fill container`}>
    {transitions((style, i) => {
      const Page = pages[i];
      return (
        <Page
          style={style}
          triggerTransition={onClick}
          slotsCount={parkingSlotsCount}
          setParkingSlotsCount={setParkingSlotsCount}
        />
      );
    })}
  </div>
  )
}

export default App
