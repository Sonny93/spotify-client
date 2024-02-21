import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'

const allyConfig = defineConfig({
  spotify: services.spotify({
    clientId: env.get('SPOTIFY_CLIENT_ID'),
    clientSecret: env.get('SPOTIFY_CLIENT_SECRET'),
    callbackUrl: env.get('SPOTIFY_REDIRECT_URL'),
    scopes: [
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-email',
      'user-modify-playback-state',
    ],
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
