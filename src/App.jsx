import { useEffect, useState } from 'react'
import './App.css'
import Timer from './Components/timer'
import Settings from './Components/Settings';
import SettingsButton from './Components/SettingsButton';
import SettingsContext from './SettingsContext';

function App() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState('focus')

  return (
    <main className='pt-11 max-w-96 mx-auto text-center flex flex-col items-center justify-center'>
      <SettingsContext.Provider value={{
        settingsVisible,
        setSettingsVisible,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
        mode,
        setMode
      }}>
        <p className='text-5xl py-8'>Pomodoro Timer</p>
        {settingsVisible && (
          <Settings />
        )}

        <Timer />
        
        <div className='mt-5 my-8'>
          <SettingsButton onClick={() => { setSettingsVisible(true) }} />
        </div>
      </SettingsContext.Provider>
    </main>
  )
}

export default App
