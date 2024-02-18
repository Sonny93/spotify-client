/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SpotifyController = () => import('#controllers/spotify_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/auth/redirect', [UsersController, 'spotify'])
router.get('/auth/callback', [UsersController, 'callbackAuth'])
router.get('/auth/logout', [UsersController, 'logout'])

router
  .group(() => {
    router.get('/', [SpotifyController, 'recentlyPlayedTrack'])
  })
  .middleware([middleware.auth()])