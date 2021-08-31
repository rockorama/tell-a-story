import { useRef, useState } from 'react'

import './App.css'
import Game from './Game'

export default function App() {
  const [started, setStarted] = useState(false)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('3')
  const [participants, setParticipants] = useState<string[]>([])

  const field = useRef<HTMLInputElement | null>(null)

  if (!started) {
    const addParticipant = () => {
      if (participants.indexOf(name) >= 0) {
        alert('Cannot repeat names!')
        return
      }

      setParticipants((ps) => [...ps, name])
      setName('')
      field.current?.focus()
    }

    return (
      <div className="app">
        <h1>Tell a story!</h1>
        <div className="participants">
          {participants.length ? (
            <ol>
              {participants.map((participant) => {
                return <li key={participant}>{participant}</li>
              })}
            </ol>
          ) : (
            <div className="no-participants">No Participants</div>
          )}

          <input
            placeholder="name"
            value={name}
            ref={field}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addParticipant()
              }
            }}
          />
        </div>
        <div className="participants">
          <div className="no-participants">Words/participant</div>

          <input
            placeholder="words/participant"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div>
          <button
            disabled={!participants.length}
            onClick={() => setStarted(true)}>
            Start!
          </button>
        </div>
      </div>
    )
  }

  return (
    <Game participants={participants} wordParticipant={Number(number || 1)} />
  )
}
