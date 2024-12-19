import React, { useContext, useEffect, useRef, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Playbutton from './Playbutton';
import PauseButton from './PauseButton';
import SettingsContext from '../SettingsContext';

const red = '#f54e4e';
const green = '#4aec8c';

const Timer = () => {
  const SettingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState((SettingsInfo.mode === 'focus' ? SettingsInfo.workMinutes : SettingsInfo.breakMinutes) * 60)

  const [percentage, setPercentage] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()

  const secondsLeftRef = useRef(secondsLeft)
  const isPausedRef = useRef(isPaused)

  function initTimer(mode){
    const init_seconds = mode === 'focus' ? (SettingsInfo.workMinutes * 60) : (SettingsInfo.breakMinutes *60)
    setSecondsLeft(init_seconds);
    secondsLeftRef.current = init_seconds

    setIsPaused(true)
    isPausedRef.current = true
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = SettingsInfo.mode === 'focus' ? 'break' : 'focus'
      const nextSeconds = (nextMode === 'focus' ? SettingsInfo.workMinutes : SettingsInfo.breakMinutes) * 60;
      SettingsInfo.setMode(nextMode)
      setSecondsLeft(nextSeconds)
      secondsLeftRef.current = nextSeconds

      setIsPaused(true)
      isPausedRef.current = true
    }

    function tick() {
      secondsLeftRef.current = secondsLeftRef.current - 1
      setSecondsLeft(secondsLeftRef.current)
    }

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return
      }
      if (secondsLeftRef.current === 0) {
        switchMode()
      }
      tick();
    }, 1000);

    const totalSeconds = SettingsInfo.mode === 'focus' ? (SettingsInfo.workMinutes * 60) : (SettingsInfo.breakMinutes * 60)
    setPercentage((secondsLeftRef.current / totalSeconds) * 100)

    setMinutes(Math.floor(secondsLeftRef.current / 60))
    let seconds_display = secondsLeftRef.current % 60
    if (seconds_display < 10) {
      seconds_display = '0' + seconds_display
    }
    setSeconds(seconds_display)

    return () => clearInterval(interval)
  }, [SettingsInfo, secondsLeftRef.current, SettingsInfo.mode, SettingsInfo.workMinutes, SettingsInfo.breakMinutes])

  return (
    <div className='flex flex-col justify-center items-center max-w-60'>
      <div className='my-8 border-2 border-cyan-500 rounded-md'>
        <button 
        className='w-24 border-r-2 border-cyan-500 hover:bg-slate-700' 
        onClick={() => { SettingsInfo.setMode('focus');initTimer('focus') }}>
          Focus
        </button>
        <button 
        className='w-24 hover:bg-slate-700' 
        onClick={() => { SettingsInfo.setMode('break');initTimer('break') }}>
          Break
        </button>
      </div>
      <CircularProgressbar value={percentage} text={minutes + ':' + seconds} styles={buildStyles({
        textColor: '#fff',
        pathColor: SettingsInfo.mode === 'focus' ? red : green,
        trailColor: '#6c757d',
      })} />
      <div className='flex flex-row justify-center items-center mt-5'>
        {isPaused ? <Playbutton className='flex justify-center items-center' onClick={() => { setIsPaused(false); isPausedRef.current = false }} /> : <PauseButton className='flex justify-center items-center' onClick={() => { setIsPaused(true); isPausedRef.current = true }} />}
      </div>
    </div>
  )
}

export default Timer
