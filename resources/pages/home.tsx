import RecentlyPlayedTracks from '@/components/RecentlyPlayedTracks'
import TrackDuration from '@/components/Track/TrackDuration'
import dayjs from 'dayjs'
import frLocale from 'dayjs/locale/fr'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale(frLocale)

interface HomePageProps {
  tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse
  currentTrack: SpotifyApi.CurrentlyPlayingResponse
}

export default function HomePage({ tracks, currentTrack }: HomePageProps) {
  return (
    <div>
      <div
        css={{
          height: '100vh',
          width: '100%',
          backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-image 1s',
        }}
      >
        <div
          css={{
            height: '100%',
            width: '100%',
            color: '#fff',
            backdropFilter: 'blur(.65em)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={currentTrack.item.album.images[1].url}
            height={currentTrack.item.album.images[1].height}
            width={currentTrack.item.album.images[1].width}
            alt={currentTrack.item.name}
            css={{ borderRadius: '1em', boxShadow: '0 0 .5em .25em rgba(0, 0, 0, 0.35)' }}
          />
          <div>
            <h1>
              {currentTrack.item.name} -{' '}
              {currentTrack.item.artists.map((artist) => artist.name).join(', ')}
            </h1>
            <span css={{ color: '#888', fontSize: '.9em' }}>
              <TrackDuration duration={currentTrack.item.duration_ms} />
            </span>
          </div>
        </div>
      </div>
      <h2>Recently played tracks</h2>
      <RecentlyPlayedTracks
        tracks={[{ track: currentTrack.item, played_at: undefined }, ...tracks.items] as any}
      />
    </div>
  )
}
