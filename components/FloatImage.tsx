// components/FloatImage.tsx
import Image from 'next/image'
import { ReactNode } from 'react'

interface FloatImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  position?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
  caption?: string
  className?: string
}

const FloatImage = ({
  src,
  alt,
  width = 200,
  height = 150,
  position = 'left',
  size = 'small',
  caption,
  className = ''
}: FloatImageProps) => {
  const sizeClasses = {
    small: 'max-w-[200px]',
    medium: 'max-w-[300px]',
    large: 'max-w-[400px]'
  }

  const positionClasses = {
    left: 'float-left mr-4 mb-4',
    right: 'float-right ml-4 mb-4'
  }

  return (
    <figure 
      className={`
        ${positionClasses[position]} 
        ${sizeClasses[size]} 
        clear-both
        ${className}
      `}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default FloatImage