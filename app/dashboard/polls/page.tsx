'use client'

import { useState } from 'react'
import { BarChart3, Users, Clock, Check, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const polls = [
  {
    id: 1,
    question: 'What content should I focus on next week?',
    options: [
      { id: 'a', text: 'Behind the scenes', votes: 234, percentage: 45 },
      { id: 'b', text: 'Photoshoots', votes: 156, percentage: 30 },
      { id: 'c', text: 'Q&A sessions', votes: 89, percentage: 17 },
      { id: 'd', text: 'Tutorials', votes: 42, percentage: 8 },
    ],
    totalVotes: 521,
    endsIn: '2 days',
    isActive: true,
    hasVoted: false,
    tierRequired: null,
  },
  {
    id: 2,
    question: 'Which location for the next photoshoot?',
    options: [
      { id: 'a', text: 'Beach', votes: 412, percentage: 52 },
      { id: 'b', text: 'Urban', votes: 267, percentage: 34 },
      { id: 'c', text: 'Studio', votes: 112, percentage: 14 },
    ],
    totalVotes: 791,
    endsIn: '5 hours',
    isActive: true,
    hasVoted: true,
    votedOption: 'a',
    tierRequired: null,
  },
  {
    id: 3,
    question: 'VIP Only: Choose the theme for exclusive content',
    options: [
      { id: 'a', text: 'Vintage', votes: 0, percentage: 0 },
      { id: 'b', text: 'Modern', votes: 0, percentage: 0 },
      { id: 'c', text: 'Fantasy', votes: 0, percentage: 0 },
    ],
    totalVotes: 0,
    endsIn: '4 days',
    isActive: true,
    hasVoted: false,
    tierRequired: 'VIP',
  },
  {
    id: 4,
    question: 'Best day for live streams?',
    options: [
      { id: 'a', text: 'Friday', votes: 523, percentage: 38 },
      { id: 'b', text: 'Saturday', votes: 612, percentage: 45 },
      { id: 'c', text: 'Sunday', votes: 234, percentage: 17 },
    ],
    totalVotes: 1369,
    endsIn: null,
    isActive: false,
    hasVoted: true,
    votedOption: 'b',
    tierRequired: null,
  },
]

export default function PollsPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})

  const handleVote = (pollId: number, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [pollId]: optionId }))
  }

  const submitVote = (pollId: number) => {
    // Would submit to API
    console.log('Voting on poll', pollId, 'with option', selectedOptions[pollId])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight">POLLS</h1>
            <p className="text-xs text-muted-foreground mt-1">Vote on upcoming content</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Back to Feed
            </Button>
          </Link>
        </div>

        {/* Active Polls */}
        <div className="mb-8">
          <h2 className="text-xs font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Clock className="h-3 w-3" />
            ACTIVE POLLS
          </h2>
          <div className="space-y-4">
            {polls.filter(p => p.isActive).map((poll) => (
              <div key={poll.id} className="border border-border p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xs font-medium">{poll.question}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {poll.totalVotes.toLocaleString()} votes
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Ends in {poll.endsIn}
                      </span>
                    </div>
                  </div>
                  {poll.tierRequired && (
                    <span className="text-[10px] border border-border px-2 py-0.5 flex items-center gap-1">
                      <Lock className="h-2.5 w-2.5" />
                      {poll.tierRequired}
                    </span>
                  )}
                </div>

                {poll.tierRequired && !poll.hasVoted ? (
                  <div className="text-center py-6 border border-dashed border-border">
                    <Lock className="h-4 w-4 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mb-3">
                      {poll.tierRequired} tier required to vote
                    </p>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Upgrade to {poll.tierRequired}
                    </Button>
                  </div>
                ) : poll.hasVoted ? (
                  <div className="space-y-2">
                    {poll.options.map((option) => (
                      <div key={option.id} className="relative">
                        <div 
                          className="absolute inset-0 bg-muted"
                          style={{ width: `${option.percentage}%` }}
                        />
                        <div className="relative flex items-center justify-between p-2 border border-border">
                          <div className="flex items-center gap-2">
                            {poll.votedOption === option.id && (
                              <Check className="h-3 w-3" />
                            )}
                            <span className="text-xs">{option.text}</span>
                          </div>
                          <span className="text-xs font-medium">{option.percentage}%</span>
                        </div>
                      </div>
                    ))}
                    <p className="text-[10px] text-muted-foreground mt-2">
                      You voted for: {poll.options.find(o => o.id === poll.votedOption)?.text}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {poll.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleVote(poll.id, option.id)}
                        className={`w-full text-left p-2 border transition-colors ${
                          selectedOptions[poll.id] === option.id
                            ? 'border-foreground bg-muted'
                            : 'border-border hover:border-foreground/50'
                        }`}
                      >
                        <span className="text-xs">{option.text}</span>
                      </button>
                    ))}
                    {selectedOptions[poll.id] && (
                      <Button 
                        onClick={() => submitVote(poll.id)}
                        className="w-full mt-2 text-xs h-8"
                      >
                        Submit Vote
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Past Polls */}
        <div>
          <h2 className="text-xs font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-3 w-3" />
            PAST POLLS
          </h2>
          <div className="space-y-4">
            {polls.filter(p => !p.isActive).map((poll) => (
              <div key={poll.id} className="border border-border p-4 opacity-70">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xs font-medium">{poll.question}</h3>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3" />
                      {poll.totalVotes.toLocaleString()} total votes
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">ENDED</span>
                </div>

                <div className="space-y-2">
                  {poll.options.map((option) => (
                    <div key={option.id} className="relative">
                      <div 
                        className="absolute inset-0 bg-muted"
                        style={{ width: `${option.percentage}%` }}
                      />
                      <div className="relative flex items-center justify-between p-2 border border-border">
                        <div className="flex items-center gap-2">
                          {poll.votedOption === option.id && (
                            <Check className="h-3 w-3" />
                          )}
                          <span className="text-xs">{option.text}</span>
                        </div>
                        <span className="text-xs font-medium">{option.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
