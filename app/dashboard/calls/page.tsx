"use client"

import { useState } from "react"
import { Phone, Video, Clock, DollarSign, PhoneOff, Mic, MicOff, VideoOff, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

type CallType = "video" | "audio" | null

export default function CallsPage() {
  const [callType, setCallType] = useState<CallType>(null)
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isSpeakerOff, setIsSpeakerOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [balance, setBalance] = useState(45.00)

  const rates = {
    video: 5.99,
    audio: 3.99
  }

  const startCall = (type: CallType) => {
    if (balance < (type === "video" ? rates.video : rates.audio)) {
      alert("Insufficient balance. Please top up.")
      return
    }
    setCallType(type)
    setIsInCall(true)
    // Simulate call duration
    const interval = setInterval(() => {
      setCallDuration(prev => {
        const newDuration = prev + 1
        // Deduct per minute
        if (newDuration % 60 === 0) {
          setBalance(b => {
            const rate = type === "video" ? rates.video : rates.audio
            return Math.max(0, b - rate)
          })
        }
        return newDuration
      })
    }, 1000)
    return () => clearInterval(interval)
  }

  const endCall = () => {
    setIsInCall(false)
    setCallType(null)
    setCallDuration(0)
    setIsMuted(false)
    setIsVideoOff(false)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isInCall) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Call Screen */}
        <div className="flex-1 flex items-center justify-center relative">
          {callType === "video" && !isVideoOff ? (
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 border border-neutral-700 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold">C</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">Video Feed</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 border border-neutral-700 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold">C</span>
              </div>
              <p className="text-sm font-bold">CNOIRYA</p>
              <p className="text-xs text-neutral-500 mt-1">{callType === "video" ? "Video Call" : "Audio Call"}</p>
            </div>
          )}

          {/* Self Preview (Video Only) */}
          {callType === "video" && !isVideoOff && (
            <div className="absolute bottom-24 right-4 w-32 h-24 border border-neutral-700 bg-neutral-800 flex items-center justify-center">
              <span className="text-xs text-neutral-500">You</span>
            </div>
          )}
        </div>

        {/* Call Info */}
        <div className="text-center py-4 border-t border-neutral-800">
          <p className="text-2xl font-bold font-mono">{formatDuration(callDuration)}</p>
          <p className="text-xs text-neutral-500 mt-1">
            ${callType === "video" ? rates.video : rates.audio}/min | Balance: ${balance.toFixed(2)}
          </p>
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-neutral-800">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 border flex items-center justify-center ${isMuted ? "bg-white text-black" : "border-neutral-700"}`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {callType === "video" && (
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-14 h-14 border flex items-center justify-center ${isVideoOff ? "bg-white text-black" : "border-neutral-700"}`}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => setIsSpeakerOff(!isSpeakerOff)}
              className={`w-14 h-14 border flex items-center justify-center ${isSpeakerOff ? "bg-white text-black" : "border-neutral-700"}`}
            >
              {isSpeakerOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={endCall}
              className="w-14 h-14 bg-white text-black flex items-center justify-center"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Private Calls</h1>

        {/* Balance Display */}
        <div className="border border-black p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">Your Balance</p>
              <p className="text-3xl font-bold mt-1">${balance.toFixed(2)}</p>
            </div>
            <Button variant="outline" className="border-black text-xs uppercase tracking-widest">
              Top Up
            </Button>
          </div>
        </div>

        {/* Call Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Video Call */}
          <div className="border border-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Video Call</span>
            </div>
            <div className="mb-4">
              <p className="text-2xl font-bold">${rates.video}</p>
              <p className="text-xs text-neutral-500">per minute</p>
            </div>
            <ul className="text-xs text-neutral-600 space-y-1 mb-6">
              <li>- Face-to-face interaction</li>
              <li>- HD video quality</li>
              <li>- Screen share available</li>
              <li>- Private & encrypted</li>
            </ul>
            <Button 
              onClick={() => startCall("video")}
              className="w-full bg-black text-white text-xs uppercase tracking-widest"
            >
              Start Video Call
            </Button>
          </div>

          {/* Audio Call */}
          <div className="border border-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Audio Call</span>
            </div>
            <div className="mb-4">
              <p className="text-2xl font-bold">${rates.audio}</p>
              <p className="text-xs text-neutral-500">per minute</p>
            </div>
            <ul className="text-xs text-neutral-600 space-y-1 mb-6">
              <li>- Voice conversation</li>
              <li>- Crystal clear audio</li>
              <li>- Lower rate</li>
              <li>- Private & encrypted</li>
            </ul>
            <Button 
              onClick={() => startCall("audio")}
              className="w-full bg-black text-white text-xs uppercase tracking-widest"
            >
              Start Audio Call
            </Button>
          </div>
        </div>

        {/* Call History */}
        <div className="border border-black">
          <div className="border-b border-black p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">Call History</h2>
          </div>
          <div className="divide-y divide-neutral-200">
            {[
              { type: "video", date: "Mar 28, 2026", duration: "12:34", cost: 74.88 },
              { type: "audio", date: "Mar 25, 2026", duration: "8:15", cost: 32.92 },
              { type: "video", date: "Mar 20, 2026", duration: "5:02", cost: 30.12 },
              { type: "audio", date: "Mar 15, 2026", duration: "22:47", cost: 90.89 },
            ].map((call, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {call.type === "video" ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <Phone className="w-4 h-4" />
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase">{call.type} Call</p>
                    <p className="text-xs text-neutral-500">{call.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono">{call.duration}</p>
                  <p className="text-xs text-neutral-500">${call.cost.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
