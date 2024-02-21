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

  private async broadcastCurrentPlayingTrack(ctx: HttpContext, interval: NodeJS.Timeout) {
    try {
      const currentTrack = await this.getCurrentPlayingTrack(ctx)
      transmit.broadcast('player', { currentTrack })
      logger.debug(
        `Broadcast current track (${currentTrack?.item?.name ?? 'no active song'}) to ${ctx.auth.user?.id}`
      )
    } catch (error) {
      transmit.broadcast('player', { currentTrack: undefined, authNeeded: true })
      logger.error(`Spotify timeout when broadcasting to ${ctx.auth.user?.id}`)
      clearInterval(interval)
    }
  }

  async getCurrentPlayingTrack({ spotify }: HttpContext) {
    const { body: currentTrack } = await spotify!.getMyCurrentPlayingTrack()
    return JSON.stringify(currentTrack) !== JSON.stringify({}) ? currentTrack : undefined
  }

  async play({ spotify }: HttpContext) {
    await spotify!.play()
  }

  async pause({ spotify }: HttpContext) {
    await spotify!.pause()
  }
}
