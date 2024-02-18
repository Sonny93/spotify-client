import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import RecentlyPlayedTracks from '@/components/RecentlyPlayedTracks'
import { TransmitContextProvider } from '@/contexts/transmitContext'
import dayjs from 'dayjs'
import frLocale from 'dayjs/locale/fr'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale(frLocale)

interface HomePageProps {
  tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse
  currentTrack: Track
}

export default function HomePage({ tracks, currentTrack }: HomePageProps) {
  return (
    <TransmitContextProvider>
      <div>
        <CurrentlyPlaying currentTrack={currentTrack} />
        <div
          id="recently-played"
          css={{ padding: '1em', display: 'flex', gap: '1em', flexDirection: 'column' }}
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
