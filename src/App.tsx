import { useRef, useState } from 'react'
import Form from 'formact'

import './App.css'
import TextField from './components/TextField'
import Game from './Game'
import SubmitButton from './components/SubmitButton'

export default function App() {
  const [started, setStarted] = useState<{
    wordParticipant: number
    secondsWord: number
  } | null>(null)

  const [participants, setParticipants] = useState<string[]>([])

  const field = useRef<HTMLInputElement | null>(null)

  if (!started) {
    return (
      <div className="app">
        <h1>Tell a story!</h1>
        <div className="participants">
          {participants.length ? (
            <>
              <h3>Participants</h3>
              <ol>
                {participants.map((participant) => {
                  return (
                    <li
                      key={participant}
                      onClick={() => {
                        setParticipants(
                          participants.filter((p) => p !== participant),
                        )
                        field.current?.focus()
                      }}>
                      <button className="small">x</button> {participant}
                    </li>
                  )
                })}
              </ol>
            </>
          ) : (
            <h3>No Participants</h3>
          )}
          <Form
            onSubmit={(payload) => {
              if (payload.valid) {
                if (participants.indexOf(payload.values.participant) >= 0) {
                  alert('Cannot repeat names!')
                } else {
                  setParticipants((ps) => [...ps, payload.values.participant])
                  field.current?.focus()
                  payload.onFinish(true)
                }
              }
            }}>
            <TextField
              placeholder="name"
              name="participant"
              ref={field}
              required
            />
          </Form>
        </div>

        <Form
          onSubmit={(payload) => {
            if (payload.valid) {
              setStarted({
                wordParticipant: Number(payload.values.words),
                secondsWord: Number(payload.values.seconds),
              })
            }
            payload.onFinish()
          }}
          initialValues={{
            seconds: '15',
            words: '3',
          }}>
          <div className="participants">
            <h3>Words / Participant</h3>
            <TextField name="words" placeholder="words/participant" required />
          </div>
          <div className="participants">
            <h3>Seconds / Word</h3>
            <TextField name="seconds" placeholder="seconds/word" required />
          </div>

          <div>
            <SubmitButton disabled={!participants.length}>Start!</SubmitButton>
          </div>
        </Form>
      </div>
    )
  }

  return (
    <Game
      participants={participants}
      {...started}
      onReset={() => setStarted(null)}
    />
  )
}
