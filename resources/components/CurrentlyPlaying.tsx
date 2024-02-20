import styled from '@emotion/styled'
import { useEffect, type ReactNode } from 'react'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import TrackDuration from './Track/TrackDuration'
import TrackProgressBar from './Track/TrackProgressBar'

const BackgroundImage = styled.header({
  'position': 'relative',
  'height': '100vh',
  'width': '100%',
  'backgroundRepeat': 'no-repeat',
  'backgroundPosition': 'center',
  'backgroundSize': 'cover',
  'backgroundAttachment': 'fixed',
  'scrollSnapStop': 'normal',
  'scrollSnapAlign': 'center',
  'color': '#fff',
  'backgroundColor': '#333',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'transition': 'background cubic-bezier(0.4, 0, 0.2, 1) 1s',
  '& #scroll-container': {
    opacity: 0,
    transition: '.15s',
  },
  '&:hover #scroll-container': {
    opacity: 1,
  },
  '@media (max-width: 1024px)': {
    '& #scroll-container': {
      display: 'none',
    },
  },
})

const TrackContainer = styled.div({
  'height': '100%',
  'width': '100%',
  'fontSize': '1.5em',
  'color': '#fff',
  'backdropFilter': 'blur(40px) brightness(0.7)',
  'padding': '0 4em',
  'display': 'flex',
  'gap': '2em',
  'alignItems': 'center',
  'justifyContent': 'center',
  '@media (max-width: 1024px)': {
    padding: '1em',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
})

const LargeImageThumbnail = styled.img({
  'width': 'clamp(250px, 100%, 400px)',
  'borderRadius': '1em',
  'boxShadow': '0 0 .5em .25em rgba(0, 0, 0, 0.35)',
  'aspectRatio': '1 / 1',
  'transition': 'transform .15s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  '@media (max-width: 1024px)': {
    width: 'clamp(250px, 100%, 500px)',
  },
})

const SongName = styled.h1({
  'color': '#fff',
  'fontSize': '2em',
  '@media (max-width: 1024px)': {
    fontSize: '1.25em',
  },
})
const ArtistName = styled.h2({
  'color': '#ccc',
  'fontSize': '1.5em',
  '@media (max-width: 1024px)': {
    fontSize: '.75em',
  },
})

export default function CurrentlyPlaying({
  currentTrack,
  children,
}: {
  currentTrack?: Track
  children: ReactNode
}) {
  const isPlaying = currentTrack && currentTrack.currently_playing_type === 'track'

  useEffect(() => {
    document.title = currentTrack?.item?.name
      ? `${currentTrack?.item?.name} - SpotiClient`
      : 'SpotiClient'
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }
    link.href = currentTrack?.item?.album.images[2].url ?? ''
  }, [currentTrack])

  return (
    <BackgroundImage
      style={
        isPlaying
          ? {
              backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
            }
          : {}
      }
    >
      {isPlaying && (
        <TrackContainer>
          <LargeImageThumbnail
            src={currentTrack.item.album.images[1].url}
            alt={currentTrack.item.name}
          />
          <div
            css={{
              'mixBlendMode': 'color-dodge',
              'display': 'flex',
              'flex': 1,
              'gap': '.35em',
              'flexDirection': 'column',
              '@media (max-width: 1024px)': {
                width: '100%',
                flex: 'unset',
              },
            }}
          >
            <SongName>{currentTrack.item.name}</SongName>
            <ArtistName>
              {currentTrack.item.artists.map((artist) => artist.name).join(', ')}
            </ArtistName>
            <div
              css={{
                width: '100%',
                fontSize: '.75em',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TrackDuration duration={currentTrack.progress_ms} />
              {!currentTrack.is_playing && <CiPlay1 size={24} />}
              {currentTrack.is_playing && <CiPause1 size={24} />}
              <TrackDuration duration={currentTrack.item.duration_ms} />
            </div>
            <TrackProgressBar
              key={currentTrack.item.id}
              duration={currentTrack.item.duration_ms}
              progress={currentTrack.progress_ms}
            />
          </div>
        </TrackContainer>
      )}
      {!isPlaying && <h1>No song playing</h1>}
      {children}
    </BackgroundImage>
  )
}
