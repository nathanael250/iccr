import type { ImgHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
}

export default function Image({
  src,
  alt,
  fill,
  priority,
  className,
  loading,
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : loading ?? 'lazy'}
      className={cn(fill && 'absolute inset-0 h-full w-full', className)}
      {...props}
    />
  )
}
