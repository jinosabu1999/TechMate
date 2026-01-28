"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Mic,
  Square,
  Copy,
  Check,
  Trash2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface TranscriptItem {
  id: string
  text: string
  date: string
}

export function Recorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [transcriptHistory, setTranscriptHistory] = useState<TranscriptItem[]>(
    []
  )
  const [editingTranscript, setEditingTranscript] =
    useState<TranscriptItem | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (
      "SpeechRecognition" in window ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        setTranscript(
          (prevTranscript) =>
            prevTranscript + finalTranscript + interimTranscript
        )
      }
    } else {
      setIsSupported(false)
    }

    const savedHistory = localStorage.getItem("transcriptHistory")
    if (savedHistory) {
      setTranscriptHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("transcriptHistory", JSON.stringify(transcriptHistory))
  }, [transcriptHistory])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      mediaRecorder.current.start()
      setIsRecording(true)
      setTranscript("")

      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
    } catch {
      toast.error("Error accessing microphone. Please check your permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop())
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
    saveTranscript()
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(transcript)
    setIsCopied(true)
    toast.success("Transcript copied to clipboard")
    setTimeout(() => setIsCopied(false), 2000)
  }

  const saveTranscript = () => {
    if (transcript.trim()) {
      const newTranscript: TranscriptItem = {
        id: Date.now().toString(),
        text: transcript,
        date: new Date().toLocaleString(),
      }
      setTranscriptHistory((prev) => [newTranscript, ...prev])
      setTranscript("")
      toast.success("Transcript saved")
    }
  }

  const deleteTranscript = (id: string) => {
    setTranscriptHistory((prev) => prev.filter((item) => item.id !== id))
    toast.success("Transcript deleted")
  }

  const updateTranscript = () => {
    if (editingTranscript) {
      setTranscriptHistory((prev) =>
        prev.map((item) =>
          item.id === editingTranscript.id ? editingTranscript : item
        )
      )
      setEditingTranscript(null)
      toast.success("Transcript updated")
    }
  }

  if (!isSupported) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center animate-fade-in">
        <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          Speech Recognition Not Supported
        </h3>
        <p className="text-muted-foreground">
          Your browser does not support the Web Speech API. Please try using
          Chrome, Edge, or Safari.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Recording Control */}
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              "relative h-24 w-24 sm:h-32 sm:w-32 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isRecording
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-accent hover:bg-accent/90"
            )}
          >
            {isRecording && (
              <span className="absolute inset-0 rounded-full animate-ping bg-destructive/40" />
            )}
            <span className="relative flex items-center justify-center h-full">
              {isRecording ? (
                <Square className="h-8 w-8 sm:h-10 sm:w-10 text-destructive-foreground" />
              ) : (
                <Mic className="h-8 w-8 sm:h-10 sm:w-10 text-accent-foreground" />
              )}
            </span>
          </button>

          <div className="text-center">
            <p className="text-lg font-medium">
              {isRecording ? "Recording..." : "Tap to Start Recording"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isRecording
                ? "Speak clearly into your microphone"
                : "Your voice will be transcribed in real-time"}
            </p>
          </div>
        </div>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Current Transcript</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-accent" />
                  <span className="text-accent">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="min-h-[120px] bg-muted/50 border-0 resize-none"
            placeholder="Your transcript will appear here..."
          />
        </div>
      )}

      {/* History Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 border-border"
          >
            <Clock className="mr-2 h-4 w-4" />
            View History
            {transcriptHistory.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-muted rounded-full">
                {transcriptHistory.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transcript History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
            {transcriptHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No transcripts saved yet</p>
              </div>
            ) : (
              transcriptHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    {item.date}
                  </p>
                  <p className="text-sm leading-relaxed line-clamp-3">
                    {item.text}
                  </p>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => setEditingTranscript(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-destructive hover:text-destructive"
                      onClick={() => deleteTranscript(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {editingTranscript && (
        <Dialog
          open={!!editingTranscript}
          onOpenChange={() => setEditingTranscript(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transcript</DialogTitle>
            </DialogHeader>
            <Textarea
              value={editingTranscript.text}
              onChange={(e) =>
                setEditingTranscript({
                  ...editingTranscript,
                  text: e.target.value,
                })
              }
              className="min-h-[150px]"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingTranscript(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={updateTranscript}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
