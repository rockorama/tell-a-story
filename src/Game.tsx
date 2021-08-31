import { useEffect, useState } from 'react'
import getWord from './words'

const INTERVAL = 3

const initialWord = getWord()

export default function Game({
  participants,
  wordParticipant,
}: {
  participants: string[]
  wordParticipant: number
}) {
  const [word, setWord] = useState(initialWord)
  const [participant, setParticipant] = useState(0)
  const [timer, setTimer] = useState(INTERVAL)
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    if (words.length === wordParticipant * participants.length) {
      setTimer(0)
      return
    }

    const timeoutID = setInterval(() => {
      if (timer === 1) {
        setWords([...words, word])
        setWord(getWord())
        setTimer(INTERVAL)

        setParticipant(
          participant === participants.length - 1 ? 0 : participant + 1,
        )

        return
      }
      setTimer(timer - 1)
    }, 1000)

    return () => clearTimeout(timeoutID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  if (words.length >= wordParticipant * participants.length) {
    return (
      <div className="game">
        <div className="word">the end ;-)</div>
        <div className="words">
          Words used:
          <br />
          {words.join(', ')}
        </div>
        <div>
          <button
            onClick={() => {
              setWords([])
              setWord(getWord())
              setParticipant(0)
              setTimer(INTERVAL)
            }}>
            Play again!
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game">
      <div className="word">{word}</div>
      <div className="participant">{participants[participant]}</div>
      <div className="timer">{timer}</div>
    </div>
  )
}
