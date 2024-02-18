import TrackCard from './Track/TrackCard'

export default function Player({
  currentTrack,
}: {
  currentTrack: SpotifyApi.CurrentlyPlayingResponse
}) {
  console.log(currentTrack)
  return <TrackCard track={currentTrack.item as SpotifyApi.TrackObjectFull} />
}
