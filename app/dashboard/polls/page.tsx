"use client"

import { useState } from "react"
import { CheckCircle, Clock, Users, ChevronRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const polls = [
  {
    id: 1,
    question: "What content would you like to see more of?",
    options: [
      { id: "a", text: "Behind the scenes", votes: 234, percentage: 45 },
      { id: "b", text: "Photoshoots", votes: 156, percentage: 30 },
      { id: "c", text: "Q&A Sessions", votes: 78, percentage: 15 },
      { id: "d", text: "Lifestyle content", votes: 52, percentage: 10 },
    ],
    totalVotes: 520,
    endsIn: "2 days",
    status: "active",
    voted: false,
    tier: "all",
  },
  {
    id: 2,
    question: "Best time for live streams?",
    options: [
      { id: "a", text: "Morning (8-11 AM)", votes: 89, percentage: 22 },
      { id: "b", text: "Afternoon (2-5 PM)", votes: 124, percentage: 31 },
      { id: "c", text: "Evening (7-10 PM)", votes: 187, percentage: 47 },
    ],
    totalVotes: 400,
    endsIn: "5 hours",
    status: "active",
    voted: true,
    votedOption: "c",
    tier: "gold",
  },
  {
    id: 3,
    question: "Next cosplay character?",
    options: [
      { id: "a", text: "Option A", votes: 445, percentage: 55 },
      { id: "b", text: "Option B", votes: 365, percentage: 45 },
    ],
    totalVotes: 810,
    endsIn: "Ended",
    status: "ended",
    voted: true,
    votedOption: "a",
    tier: "platinum",
  },
]

export default function PollsPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})

  const handleVote = (pollId: number, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [pollId]: optionId }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-sm font-bold tracking-tight">POLLS</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Vote and influence upcoming content
          </p>
        </div>

        {/* Active Polls */}
        <div className="space-y-4">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className={`border p-4 ${poll.status === "ended" ? "opacity-60" : ""}`}
            >
              {/* Poll Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {poll.tier !== "all" && (
                      <span className="text-[10px] px-1.5 py-0.5 border uppercase tracking-wider">
                        {poll.tier}
                      </span>
                    )}
                    <span
                      className={`text-[10px] px-1.5 py-0.5 ${
                        poll.status === "active"
                          ? "bg-foreground text-background"
                          : "bg-muted"
                      }`}
                    >
                      {poll.status === "active" ? "ACTIVE" : "ENDED"}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium">{poll.question}</h3>
                </div>
              </div>

              {/* Poll Options */}
              <div className="space-y-2">
                {poll.options.map((option) => {
                  const isSelected =
                    selectedOptions[poll.id] === option.id ||
                    poll.votedOption === option.id
                  const showResults = poll.voted || poll.status === "ended"

                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        !poll.voted &&
                        poll.status === "active" &&
                        handleVote(poll.id, option.id)
                      }
                      disabled={poll.voted || poll.status === "ended"}
                      className={`w-full text-left border p-3 transition-all relative overflow-hidden ${
                        isSelected ? "border-foreground" : "hover:border-foreground/50"
                      } ${poll.voted || poll.status === "ended" ? "cursor-default" : ""}`}
                    >
                      {showResults && (
                        <div
                          className="absolute inset-0 bg-muted transition-all"
                          style={{ width: `${option.percentage}%` }}
                        />
                      )}
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                          <span className="text-xs">{option.text}</span>
                        </div>
                        {showResults && (
                          <span className="text-xs font-medium">
                            {option.percentage}%
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Poll Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed">
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {poll.totalVotes} votes
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {poll.endsIn}
                  </span>
                </div>
                {!poll.voted && poll.status === "active" && selectedOptions[poll.id] && (
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Submit Vote
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Poll Results Summary */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">YOUR POLL ACTIVITY</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border p-4">
              <div className="text-2xl font-bold">12</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Polls Voted
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">8</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Won Majority
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">67%</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Win Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
