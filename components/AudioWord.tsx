import { useState } from 'react'
import { Volume2 } from 'lucide-react'

const AudioWord = ({ word, audioSrc }: { word: string; audioSrc: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = () => {
    const audio = new Audio(audioSrc)
    setIsPlaying(true)
    
    audio.play()
    
    audio.onended = () => {
      setIsPlaying(false)
    }
  }

  return (
    <button
      onClick={playAudio}
      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline decoration-dotted cursor-pointer transition-colors"
      title="Clique para ouvir a pronúncia"
    >
      {word}
      <Volume2 
        size={16} 
        className={`${isPlaying ? 'text-green-600' : ''} transition-colors`}
      />
    </button>
  )
}

export default AudioWord