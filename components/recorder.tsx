'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Square, Copy, Check, Trash2, Clock } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TranscriptItem {
  id: string;
  text: string;
  date: string;
}

export function Recorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [transcriptHistory, setTranscriptHistory] = useState<TranscriptItem[]>([])
  const [editingTranscript, setEditingTranscript] = useState<TranscriptItem | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        setTranscript(prevTranscript => prevTranscript + finalTranscript + interimTranscript)
      }
    }

    // Load transcript history from local storage
    const savedHistory = localStorage.getItem('transcriptHistory')
    if (savedHistory) {
      setTranscriptHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    // Save transcript history to local storage
    localStorage.setItem('transcriptHistory', JSON.stringify(transcriptHistory))
  }, [transcriptHistory])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      mediaRecorder.current.start()
      setIsRecording(true)
      setTranscript('')

      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast({
        description: "Error accessing microphone. Please check your permissions.",
        variant: "destructive"
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
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
    toast({ description: "Transcript copied to clipboard" })
    setTimeout(() => setIsCopied(false), 2000)
  }

  const saveTranscript = () => {
    if (transcript.trim()) {
      const newTranscript: TranscriptItem = {
        id: Date.now().toString(),
        text: transcript,
        date: new Date().toLocaleString()
      }
      setTranscriptHistory(prev => [newTranscript, ...prev])
      setTranscript('')
      toast({ description: "Transcript saved" })
    }
  }

  const deleteTranscript = (id: string) => {
    setTranscriptHistory(prev => prev.filter(item => item.id !== id))
    toast({ description: "Transcript deleted" })
  }

  const updateTranscript = () => {
    if (editingTranscript) {
      setTranscriptHistory(prev => 
        prev.map(item => 
          item.id === editingTranscript.id ? editingTranscript : item
        )
      )
      setEditingTranscript(null)
      toast({ description: "Transcript updated" })
    }
  }

  return (
    <div className="card space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={isRecording ? stopRecording : startRecording}
            className={`h-12 text-base font-semibold flex-1 sm:flex-initial ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}`}
          >
            {isRecording ? (
              <>
                <Square className="mr-2 h-5 w-5 animate-pulse" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                Start Recording
              </>
            )}
          </Button>
        </div>

        {isRecording && (
          <div className="flex items-center justify-center gap-2 text-accent">
            <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
            <span className="text-sm font-medium">Recording...</span>
          </div>
        )}
      </div>

      {transcript && (
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Current Transcript</Label>
          <div className="relative">
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[120px] text-base"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">{isCopied ? 'Copied' : 'Copy transcript'}</span>
            </Button>
          </div>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            View History ({transcriptHistory.length})
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transcript History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto space-y-3">
            {transcriptHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No transcripts yet</p>
            ) : (
              transcriptHistory.map((item) => (
                <div key={item.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <p className="mt-2 text-sm text-foreground line-clamp-3">{item.text}</p>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTranscript(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
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

      {editingTranscript && (
        <Dialog open={!!editingTranscript} onOpenChange={() => setEditingTranscript(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transcript</DialogTitle>
            </DialogHeader>
            <Textarea
              value={editingTranscript.text}
              onChange={(e) => setEditingTranscript({...editingTranscript, text: e.target.value})}
              className="min-h-[120px]"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setEditingTranscript(null)}
              >
                Cancel
              </Button>
              <Button onClick={updateTranscript}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

        
