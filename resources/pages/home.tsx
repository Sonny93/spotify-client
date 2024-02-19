import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import FloatingNavbar from '@/components/FloatingNavbar'
import RecentlyPlayedTracks from '@/components/RecentlyPlayedTracks'
import ScrollMouse from '@/components/ScrollButton'
import { TransmitContextProvider } from '@/contexts/transmitContext'
import dayjs from 'dayjs'
import frLocale from 'dayjs/locale/fr'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRef } from 'react'

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale(frLocale)

interface HomePageProps {
  tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse
  currentTrack: Track
}

export default function HomePage({ tracks, currentTrack }: HomePageProps) {
  const ref = useRef(null)
  return (
    <TransmitContextProvider>
      <FloatingNavbar />
      <div
        css={{ scrollSnapType: 'y mandatory', overscrollBehaviorX: 'contain', overflowY: 'scroll' }}
      >
        <CurrentlyPlaying currentTrack={currentTrack}>
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
          <RecentlyPlayedTracks
            tracks={
              [
                currentTrack?.item !== null &&
                  currentTrack.currently_playing_type === 'track' && {
                    track: currentTrack.item,
                    played_at: undefined,
                  },
                ...tracks.items,
              ].filter(Boolean) as any
            }
          />
        </div>
      </div>
    </TransmitContextProvider>
  )
}
