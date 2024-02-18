import { HttpContext } from '@adonisjs/core/http'

export default class SpotifyController {
  async recentlyPlayedTrack({ inertia, spotify }: HttpContext) {
    const { body: tracks } = await spotify!.getMyRecentlyPlayedTracks()
    const { body: currentTrack } = await spotify!.getMyCurrentPlayingTrack()
    return inertia.render('home', { tracks, currentTrack })
  }
}
