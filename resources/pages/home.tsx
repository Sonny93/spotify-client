import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import FloatingNavbar from '@/components/FloatingNavbar'
import RecentlyPlayedTracks from '@/components/RecentlyPlayedTracks'
import ScrollMouse from '@/components/ScrollButton'
import { TransmitContextProvider } from '@/contexts/transmitContext'
import useSubscribe from '@/hooks/useSubscribe'
import dayjs from 'dayjs'
import frLocale from 'dayjs/locale/fr'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRef, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale(frLocale)

interface HomePageProps {
  tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse
  currentTrack: Track
}

export default function HomePageWrapper({ tracks, currentTrack }: HomePageProps) {
  return (
    <TransmitContextProvider>
      <HomePage currentTrack={currentTrack} tracks={tracks} />
    </TransmitContextProvider>
  )
}

function HomePage({ tracks, currentTrack }: HomePageProps) {
  const ref = useRef(null)
  const [track, setTrack] = useState(currentTrack)
  useSubscribe<{ currentTrack: Track; authNeeded?: boolean }>(
    'player',
    ({ currentTrack, authNeeded = false }) => {
      setTrack(currentTrack)
      if (authNeeded) {
        location.href = '/auth/redirect'
      }
    },
    '/player'
  )

  return (
    <>
      <FloatingNavbar />
      <div
        css={{ scrollSnapType: 'y mandatory', overscrollBehaviorX: 'contain', overflowY: 'scroll' }}
      >
        <CurrentlyPlaying currentTrack={track}>
          <ScrollMouse targetRef={ref} />
        </CurrentlyPlaying>
        <div
          css={{
            padding: '1em',
            scrollSnapStop: 'normal',
            scrollSnapAlign: 'center',
            display: 'flex',
            gap: '1em',
            flexDirection: 'column',
          }}
          ref={ref}
        >
          <h2>Historique de lecture</h2>
          <RecentlyPlayedTracks tracks={tracks.items} />
        </div>
      </div>
    </>
  )
}
