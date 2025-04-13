'use client';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { useState } from 'react';

type EventFormImagesProps = {
  imageUrls?: string[];
};

export default function EventFormImages({ imageUrls }: EventFormImagesProps) {
  return (
    <div className="flex gap-x-2">
      {imageUrls && imageUrls.map((x, i) => <ImageContainer key={i} src={x} />)}
    </div>
  );
}

type ImageContainerProps = {
  src: string;
};
export function ImageContainer({ src }: ImageContainerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative size-16 overflow-hidden rounded-md`}>
      {isLoading && <Skeleton className="absolute inset-0 z-10 size-full animate-pulse" />}
      <Image
        src={src}
        alt={src}
        fill
        className="object-cover"
        sizes="64px"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
