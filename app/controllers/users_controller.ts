import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
  private redirectTo = '/'

  spotify = ({ ally }: HttpContext) => ally.use('spotify').redirect()

  async callbackAuth({ ally, auth, response, session }: HttpContext) {
    const spotify = ally.use('spotify')
    if (spotify.accessDenied()) {
      session.flash('flash', 'Access was denied')
      return response.redirect(this.redirectTo)
    }

    if (spotify.stateMisMatch()) {
      session.flash('flash', 'Request expired. Retry again')
      return response.redirect(this.redirectTo)
    }

    if (spotify.hasError()) {
      session.flash('flash', spotify.getError() || 'Something went wrong')
      return response.redirect(this.redirectTo)
    }

    const { emailVerificationState, token, original, ...spotifyUser } = await spotify.user()
    const user = await User.updateOrCreate(
      {
        email: spotifyUser.email,
      },
      {
        ...spotifyUser,
        isVerified: false,
        token,
      }
    )

    await auth.use('web').login(user)
    session.flash('flash', 'Successfully authenticated')
    logger.info(`[${user.email}] auth success`)

    response.redirect('/')
  }

  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('flash', 'Successfully disconnected')
    logger.info(`[${auth.user?.email}] disconnected successfully`)
    response.redirect('/')
  }
}
