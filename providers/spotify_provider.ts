import type { ApplicationService } from '@adonisjs/core/types'

export default class SpotifyProvider {
  constructor(protected app: ApplicationService) {}
  async boot() {
    await import('../src/extensions.js')
  }
}
