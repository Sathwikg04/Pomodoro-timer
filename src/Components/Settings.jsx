import React, { useContext } from 'react'
import SettingsContext from '../SettingsContext';

const Settings = () => {
    const SettingsInfo = useContext(SettingsContext)

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-5 text-white'>
                <button className='place-self-end rotate-180' onClick={() => SettingsInfo.setSettingsVisible(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-16 mb-8 flex flex-row gap-5'>
                    <button className='text-black p-8 bg-slate-400 shadow-md hover:bg-slate-500' onClick={() => {
                    SettingsInfo.setWorkMinutes(25);
                    SettingsInfo.setBreakMinutes(5);
                    SettingsInfo.setSettingsVisible(false);
                    }}>Short Timer</button>

                    <button className='text-black p-8 bg-slate-400 shadow-md hover:bg-slate-500' onClick={() => {
                    SettingsInfo.setWorkMinutes(50);
                    SettingsInfo.setBreakMinutes(10);
                    SettingsInfo.setSettingsVisible(false);
                    }}>Long Timer</button>
                </div>
            </div>
        </div>
    )
}

export default Settings
