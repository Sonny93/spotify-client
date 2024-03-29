import TrackCard from './Track/TrackCard'

export default function RecentlyPlayedTracks({
  tracks,
}: {
  tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse['items']
}) {
  return (
    <ul css={{ display: 'flex', gap: '1em', flexDirection: 'column' }}>
      {tracks.map(({ track, played_at }) => (
        <TrackCard key={played_at} track={track} playedAt={played_at} />
      ))}
    </ul>
  )
}
