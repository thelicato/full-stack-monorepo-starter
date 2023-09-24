import { useState, useRef } from 'react'
import axios from 'axios';
import logo from './logo.png'
import './App.css'
import { GuessAgeReq, GuessAgeRes } from '@full-stack-monorepo-starter/bff';

const backendURL = 'http://localhost:5000'

function App() {
  const [millionaireGuess, setMillionaireGuess] = useState<number>();
  const [name, setName] = useState<string>();
  const ageRef = useRef<HTMLInputElement>(null);

  const guess = async () => {
    if (!name || !ageRef.current) {
      return
    }
    const data: GuessAgeReq = {
      age: parseInt(ageRef.current.value)
    }
    const res = await axios.post<GuessAgeRes>(`${backendURL}/guess`, data);
    setMillionaireGuess(res.data.guessedValue)
  }

  return (
    <>
      <div>
          <img src={logo} className="logo" alt="Logo" />
      </div>
      <h1>Full-Stack Monorepo Starter</h1>
      {millionaireGuess ? (
        <>
        <p>
          <b>{name}</b>, you will become a millionare at
        </p>
        <h1>
          {millionaireGuess}
        </h1>
        <button onClick={() => setMillionaireGuess(undefined)}>
          Guess again
        </button>
        </>
      ) : (
        <>
          <p>
          Let's predict when you'll reach millionaire status! Please provide some information below.
          </p>
          <div className="container">
            <p>
              Name
            </p>
            <input type='text' id="name-input" onChange={(e) => {
              setName(e.target.value)
            }}/>
            <p>
              Age
            </p>
            <input type='number' id="age-input" ref={ageRef}/>
          </div>
          <button onClick={guess}>
            Guess
          </button>
        </>
      )}
      
    </>
  )
}

export default App
