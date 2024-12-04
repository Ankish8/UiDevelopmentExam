"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProgressTracker } from "@/components/progress-tracker"
import { Badge } from "@/components/ui/badge"

type GameResult = {
  playerA: string;
  playerB: string;
  scoreA: number;
  scoreB: number;
}

export default function TableTennisPrototype() {
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)
  const [server, setServer] = useState('A')
  const [playerA, setPlayerA] = useState('Player A')
  const [playerB, setPlayerB] = useState('Player B')
  const [pastGames, setPastGames] = useState<GameResult[]>([])
  const [winner, setWinner] = useState<string | null>(null)

  useEffect(() => {
    checkWinner()
  }, [scoreA, scoreB])

  const incrementScore = (player: 'A' | 'B') => {
    if (winner) return // Prevent score changes if there's a winner

    if (player === 'A') {
      setScoreA(prev => prev + 1)
    } else {
      setScoreB(prev => prev + 1)
    }

    // Change server every 2 points
    setServer(prev => ((scoreA + scoreB + 1) % 2 === 0) ? (prev === 'A' ? 'B' : 'A') : prev)
  }

  const checkWinner = () => {
    const leadingScore = Math.max(scoreA, scoreB)
    const scoreDifference = Math.abs(scoreA - scoreB)

    if (leadingScore >= 11 && scoreDifference >= 2) {
      const newWinner = scoreA > scoreB ? playerA : playerB
      setWinner(newWinner)
      setPastGames(prev => [...prev, { playerA, playerB, scoreA, scoreB }])
    } else {
      setWinner(null)
    }
  }

  const resetGame = () => {
    setScoreA(0)
    setScoreB(0)
    setServer('A')
    setWinner(null)
  }

  const getGameStatus = () => {
    if (winner) {
      return `${winner} wins!`
    }
    const leadingScore = Math.max(scoreA, scoreB)
    if (leadingScore >= 10 && scoreA === scoreB) {
      return "Deuce!"
    } else if (leadingScore === 10) {
      return "Game point!"
    }
    return `Server: ${server === 'A' ? playerA : playerB}`
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-center">Table Tennis Scorer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <Input 
                  value={playerA} 
                  onChange={(e) => setPlayerA(e.target.value)}
                  className="mb-2 text-center"
                />
                <p className="text-4xl font-bold">{scoreA}</p>
                <Button onClick={() => incrementScore('A')} className="mt-2" disabled={!!winner}>+1</Button>
                {server === 'A' && <Badge className="mt-2">Serving</Badge>}
              </div>
              <div className="text-center">
                <Input 
                  value={playerB} 
                  onChange={(e) => setPlayerB(e.target.value)}
                  className="mb-2 text-center"
                />
                <p className="text-4xl font-bold">{scoreB}</p>
                <Button onClick={() => incrementScore('B')} className="mt-2" disabled={!!winner}>+1</Button>
                {server === 'B' && <Badge className="mt-2">Serving</Badge>}
              </div>
            </div>
            <p className="text-center font-semibold">{getGameStatus()}</p>
            {winner && (
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-2">{winner} wins the game!</p>
                <Button onClick={resetGame} className="w-full">Start New Game</Button>
              </div>
            )}
            {!winner && <Button onClick={resetGame} className="w-full">Reset Game</Button>}
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-center">Progress Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressTracker />
          </CardContent>
        </Card>
      </div>
      
      <Button asChild className="mt-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
    </div>
  )
}

