import { HttpContext } from '@adonisjs/core/http'
import SpotifyWebApi from 'spotify-web-api-node'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    spotify: SpotifyWebApi | undefined
  }
}

HttpContext.getter('spotify', function (this: HttpContext) {
  if (this.auth.isAuthenticated) {
    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(this.auth.user?.token.token!)
    return spotifyApi
  } else {
    return undefined
  }
})
