import React, { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tasks = [
  { id: 'design', label: 'Design (30 marks)', subtasks: [
    { id: 'ui', label: 'User Interface Design', marks: 15 },
    { id: 'ux', label: 'User Experience and Apple Watch Guidelines Adherence', marks: 15 },
  ]},
  { id: 'prototype', label: 'Working Prototype (50 marks)', subtasks: [
    { id: 'scoreTracking', label: 'Score Tracking', marks: 10 },
    { id: 'serverIndicator', label: 'Server Indicator', marks: 10 },
    { id: 'winDetection', label: 'Win Detection', marks: 10 },
    { id: 'pastScores', label: 'History/Past Scores', marks: 10 },
    { id: 'playerNames', label: 'Player Names', marks: 10 },
  ]},
  { id: 'dribbbleShot', label: 'Dribbble Shot (20 marks)', subtasks: [
    { id: 'presentation', label: 'Visual Presentation', marks: 10 },
    { id: 'description', label: 'Description and Explanation', marks: 10 },
  ]},
]

export function ProgressTracker() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  useEffect(() => {
    const savedTasks = localStorage.getItem('completedTasks')
    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
  }, [completedTasks])

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const calculateProgress = () => {
    const completedMarks = tasks.flatMap(task => task.subtasks)
      .filter(subtask => completedTasks.includes(subtask.id))
      .reduce((sum, subtask) => sum + subtask.marks, 0)
    return (completedMarks / 100) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id}>
              <h3 className="font-semibold mb-2">{task.label}</h3>
              <ul className="space-y-2">
                {task.subtasks.map(subtask => (
                  <li key={subtask.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={subtask.id}
                      checked={completedTasks.includes(subtask.id)}
                      onCheckedChange={() => toggleTask(subtask.id)}
                    />
                    <label htmlFor={subtask.id} className="text-sm">
                      {subtask.label} ({subtask.marks} marks)
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Progress value={calculateProgress()} className="w-full" />
          <p className="text-sm text-center mt-2">
            Overall Progress: {calculateProgress().toFixed(0)}%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

