import useSubscribe from '@/hooks/useSubscribe'
import styled from '@emotion/styled'
import { useState } from 'react'
import ScrollMouse from './ScrollButton'
import TrackDuration from './Track/TrackDuration'
import TrackProgressBar from './Track/TrackProgressBar'

const BackgroundImage = styled.header({
  position: 'relative',
  height: '100vh',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background cubic-bezier(0.4, 0, 0.2, 1) 1s',
})

const TrackContainer = styled.div({
  'height': '100%',
  'width': '100%',
  'fontSize': '1.5em',
  'color': '#fff',
  'backdropFilter': 'blur(40px) brightness(0.7)',
  'display': 'flex',
  'gap': '2em',
  'alignItems': 'center',
  'justifyContent': 'center',
  '@media (max-width: 1024px)': {
    padding: '1em',
    flexDirection: 'column',
  },
})

const LargeImageThumbnaim = styled.img({
  borderRadius: '1em',
  boxShadow: '0 0 .5em .25em rgba(0, 0, 0, 0.35)',
})

export default function CurrentlyPlaying({ currentTrack }: { currentTrack: Track }) {
  const [track, setTrack] = useState(currentTrack)
  useSubscribe<{ currentTrack: Track }>(
    'player',
    ({ currentTrack }) => setTrack(currentTrack),
    '/player'
  )

  if (track.currently_playing_type !== 'track') {
    return <></>
  }

  return (
    <BackgroundImage
      style={
        track.item.album && {
          backgroundImage: `url(${track.item.album.images[0].url})`,
        }
      }
    >
      <TrackContainer>
        <LargeImageThumbnaim
          src={track.item.album.images[1].url}
          height={track.item.album.images[1].height}
          width={track.item.album.images[1].width}
          alt={track.item.name}
        />
        <div
          css={{
            'width': '20em',
            'display': 'flex',
            'gap': '.35em',
            'flexDirection': 'column',
            '@media (max-width: 1024px)': {
              width: '100%',
            },
          }}
        >
          <h1>{track.item.name}</h1>
          <h2>{track.item.artists.map((artist) => artist.name).join(', ')}</h2>
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
            <TrackDuration duration={track.progress_ms} />
            <TrackDuration duration={track.item.duration_ms} />
          </div>
          <TrackProgressBar
            key={track.item.id}
            duration={track.item.duration_ms}
            progress={track.progress_ms}
          />
        </div>
        <ScrollMouse />
      </TrackContainer>
    </BackgroundImage>
  )
}
