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

  const [mode, setMode] = useState('focus')
  const [isPaused, setIsPaused] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)

  const secondsLeftRef = useRef(secondsLeft)
  const isPausedRef = useRef(isPaused)
  const modeRef = useRef(mode) 

  useEffect(()=>{
    function initTimer(){
      setSecondsLeft(SettingsInfo.workMinutes * 60);
    }
    initTimer();

    function switchMode() {
      const nextMode = modeRef.current === 'focus' ? 'break' : 'focus'
      const nextSeconds = (nextMode === 'focus' ? SettingsInfo.workMinutes : SettingsInfo.breakMinutes) * 60;
      setMode(nextMode)
      modeRef.current = nextMode
      setSecondsLeft(nextSeconds)
      secondsLeftRef.current = nextSeconds
    }

    function tick(){
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

    return () => clearInterval(interval)
  },[SettingsInfo])

  const totalSeconds = mode === 'focus' ? (SettingsInfo.workMinutes * 60) : (SettingsInfo.breakMinutes * 60)
  const percentage = (secondsLeftRef.current / totalSeconds)*100

  const minutes = Math.floor(secondsLeftRef.current / 60)
  let seconds = secondsLeftRef.current % 60
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  
  return (
    <div className='flex flex-col justify-center items-center max-w-60'>
      <div className='my-8 border-2 border-cyan-500 rounded-md'>
        <button className='w-24 border-r-2 border-cyan-500 hover:bg-slate-700' onClick={() => {setMode('focus')}}>Focus</button>
        <button className='w-24 hover:bg-slate-700' onClick={() => {setMode('break')}}>Break</button>
      </div>
      <CircularProgressbar value={percentage} text={minutes + ':' + seconds} styles={buildStyles({   
        textColor:'#fff',
        pathColor: mode === 'focus' ? red : green,
        trailColor:'#6c757d',
      })}/>
      <div className='flex flex-row justify-center items-center mt-5'>
        {isPaused ? <Playbutton className='flex justify-center items-center' onClick={() => {setIsPaused(false); isPausedRef.current = false}}/> : <PauseButton className='flex justify-center items-center' onClick={() => {setIsPaused(true); isPausedRef.current = true}}/>}
      </div>
    </div>
  )
}

export default Timer
