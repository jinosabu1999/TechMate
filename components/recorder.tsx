'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Square, Copy, Check, Trash2, Clock } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <Button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? <Square className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </div>
      {transcript && (
        <div className="mt-4 p-4 bg-slate-800 rounded-lg relative">
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="min-h-[100px] text-white bg-transparent border-none focus:ring-0"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">{isCopied ? 'Copied' : 'Copy transcript'}</span>
          </Button>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            View History
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transcript History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[300px] overflow-y-auto">
            {transcriptHistory.map((item) => (
              <div key={item.id} className="mb-4 p-2 bg-slate-800 rounded">
                <p className="text-sm text-gray-400">{item.date}</p>
                <p className="mt-1 text-white">{item.text}</p>
                <div className="mt-2 flex justify-end space-x-2">
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
            ))}
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
              className="min-h-[100px]"
            />
            <Button onClick={updateTranscript}>Save Changes</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

        
