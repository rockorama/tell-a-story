import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import getWord from '../words'

export default function Game({
  participants,
  wordParticipant,
  secondsWord,
  onReset,
}: {
  participants: string[]
  wordParticipant: number
  secondsWord: number
  onReset: () => any
}) {
  const [word, setWord] = useState('')
  const [participant, setParticipant] = useState(0)
  const [timer, setTimer] = useState(secondsWord)
  const [words, setWords] = useState<string[]>([])
  const [shuffledParticipants, setShuffledParticipant] = useState(participants)

  const totalWords = wordParticipant * participants.length

  useEffect(() => {
    setWord(getWord())
    setShuffledParticipant(shuffle(participants))
  }, [participants])

  useEffect(() => {
    if (words.length === totalWords) {
      setTimer(0)
      return
    }

    const timeoutID = setInterval(() => {
      if (timer === 1) {
        setWords([...words, word])
        setWord(getWord())
        setTimer(secondsWord)

        if (participants.length - 1 === participant) {
          setShuffledParticipant(shuffle(participants))
        }

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

  if (words.length >= totalWords) {
    return (
      <div className="game">
        <div className="word">the end ;-)</div>
        <div className="words">
          Words used:
          <br />
          {words.join(', ')}
        </div>
        <div>
          <button onClick={onReset}>Play again!</button>
        </div>
      </div>
    )
  }

  return (
    <div className="game">
      <div className="close">
        <button onClick={onReset} className="small">
          X
        </button>
      </div>
      <div className="word">{word}</div>
      <div className="participant">{shuffledParticipants[participant]}</div>
      <div className="timer">{timer}</div>
      <div className="progress">
        <div
          className="progress-inner"
          style={{
            width: `${
              ((words.length * secondsWord + (secondsWord - timer)) /
                (totalWords * secondsWord)) *
              100
            }%`,
          }}
        />
      </div>
    </div>
  )
}
