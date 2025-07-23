
import { useState } from 'react';
import './App.css'
import PdpPage from './components/PdpPage'


import { MyDayPicker } from 'microfrontend';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  return (
    <>
     <PdpPage />
     {/* <MyDayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date: any) => setSelectedDate(date as Date)}
            startMonth={new Date(2024, 6)}
            endMonth={new Date(2025, 11)}
          /> */}


    </>
  )
}

export default App
