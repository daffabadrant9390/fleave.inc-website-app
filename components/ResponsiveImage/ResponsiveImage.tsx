import Head from 'next/head';
import React, { JSX, useEffect, useRef, useState } from 'react';

export type ResponsiveImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  withLoader?: boolean;
  errorSrc?: string;
} & JSX.IntrinsicElements['img'];

const priorityConfig: JSX.IntrinsicElements['img'] = {
  decoding: 'async',
  loading: 'eager',
  fetchPriority: 'high',
};

const fillStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  inset: 0,
};

export const ResponsiveImage = ({
  src,
  alt = '',
  width,
  height,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 1000px, 1400px',
  srcSet,
  priority = false,
  fill,
  withLoader = true,
  // errorSrc = tds_ph_crash_image_1_1, TODO: Provide the image if error,
  ...restProps
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // if the image is rendered on SSR or by cache, onLoad will not be triggerred
    // hence will set it as isLoaded true
    if (imgRef.current?.complete) {
      // in the case the image is error on server
      const isImageError = imgRef.current.naturalWidth === 0;

      if (isImageError) {
        setHasError(true);
      }

      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={src}
          imageSrcSet={src}
          imageSizes={sizes}
          fetchPriority="high"
        />
      </Head>

      {withLoader && !hasError && !isLoaded && (
        <img
          // src={BASE64_BLUR_IMG} TODO: Provide the image if it is loading (show blur image maybe)
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.05)',
            transition: 'opacity 0.3s ease',
            opacity: isLoaded ? 0 : 1,
          }}
        />
      )}

      <img
        {...restProps}
        ref={imgRef}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        src={src}
        // srcSet={src}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        style={{
          transition: 'opacity 0.3s ease',
          opacity: isLoaded ? 1 : 0,
          ...restProps.style,
          ...(fill ? fillStyle : {}),
        }}
        {...(priority ? priorityConfig : {})}
      />
    </>
  );
};
