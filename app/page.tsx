import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">UI Development</h1>
        <p className="text-gray-600">Table Tennis Score Tracker for Apple Watch</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
            <CardDescription>Design and prototype a table tennis score tracker for Apple Watch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Table Tennis Scoring Rules:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>A game is played to 11 points</li>
                <li>Players serve two points each</li>
                <li>A point is scored on every serve</li>
                <li>If the score reaches 10-10, players serve one point each</li>
                <li>A game must be won by 2 clear points</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">App Requirements:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Simple score tracking interface for Apple Watch</li>
                <li>Score increment on tap for both players</li>
                <li>Display current server (changes every 2 points)</li>
                <li>Show game point and match status</li>
                <li>Option to reset score or start new game</li>
                <li>Feature to view past scores</li>
                <li>Ability to add player names</li>
                <li>Adhere to Apple Watch design guidelines</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Dribbble Shot Requirements:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Include multiple screens showing different states:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Initial game state</li>
                    <li>Mid-game scoring</li>
                    <li>Game point situation</li>
                    <li>Game over state</li>
                    <li>Past scores view</li>
                    <li>Player name input</li>
                  </ul>
                </li>
                <li>Attach a video demonstration (screen recording) showing the interactive prototype</li>
                <li>Add a brief description of your design decisions and how they align with Apple Watch guidelines</li>
              </ul>
              <div className="mt-4">
                <a 
                  href="https://dribbble.com/shots/23404356-Enode-Apple-Watch-UI" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline flex items-center text-sm"
                >
                  View Example Dribbble Shot Format <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Helpful Resources:</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    Apple Watch Design Guidelines <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a href="https://www.loom.com/screen-recorder" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    Loom Screen Recorder <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/prototype">
            View Table Tennis Score Tracker Prototype
          </Link>
        </Button>
      </div>

      <footer className="mt-8 text-center text-gray-600">
        <p>Submit your Dribbble shot link on Google Classroom before the deadline.</p>
        <p className="mt-2">
          <Badge variant="outline">Deadline: 3 hours from now</Badge>
        </p>
      </footer>
    </div>
  )
}

