import dayjs from 'dayjs'
import TrackDuration from './TrackDuration'

export default function TrackCard({
  track,
  playedAt,
}: {
  track: SpotifyApi.TrackObjectFull
  playedAt?: string
}) {
  const { name, artists, duration_ms } = track
  const thumbnail = track?.album.images?.[track?.album.images.length - 1]
  return (
    <li
      css={{
        'cursor': 'pointer',
        'display': 'flex',
        'gap': '1em',
        'alignItems': 'center',
        'transition': '.15s',
        '&:hover': {
          gap: '1.25em',
        },
      }}
    >
      {thumbnail && (
        <img
          src={thumbnail.url}
          height={thumbnail.height}
          width={thumbnail.width}
          alt={name}
          css={{ borderRadius: '3px' }}
        />
      )}
      <div>
        <div>
          {name} - {artists.map((artist) => artist.name).join(', ')}
        </div>
        <span css={{ color: '#888', fontSize: '.9em' }}>
          {playedAt ? dayjs(playedAt).fromNow() : 'Lecture en cours'} -{' '}
          <TrackDuration duration={duration_ms} />
        </span>
      </div>
    </li>
  )
}
