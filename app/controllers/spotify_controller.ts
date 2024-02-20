import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import transmit from '@adonisjs/transmit/services/main'

const BROADCAST_DELAY = 1000

export default class SpotifyController {
  async recentlyPlayedTrack({ inertia, spotify }: HttpContext) {
    const { body: tracks } = await spotify!.getMyRecentlyPlayedTracks({ limit: 50 })
    const { body: currentTrack } = await spotify!.getMyCurrentPlayingTrack()
    return inertia.render('home', { tracks, currentTrack })
  }

  // TODO: find a better solution
  async player(ctx: HttpContext) {
    const intervalId: any = setInterval(
      () => this.broadcastCurrentPlayingTrack(ctx, intervalId),
      BROADCAST_DELAY
    )
    transmit.on('disconnect', () => clearTimeout(intervalId))
  }

  private async broadcastCurrentPlayingTrack(
    { auth, spotify }: HttpContext,
    interval: NodeJS.Timeout
  ) {
    try {
      const { body: currentTrack } = await spotify!.getMyCurrentPlayingTrack()
      transmit.broadcast('player', { currentTrack })
      logger.debug(`Broadcast current track (${currentTrack.item?.name}) to ${auth.user?.id}`)
    } catch (error) {
      transmit.broadcast('player', { currentTrack: undefined, authNeeded: true })
      logger.error(`Spotify timeout when broadcasting to ${auth.user?.id}`)
      clearInterval(interval)
    }
  }
}
