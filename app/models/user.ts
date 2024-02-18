import { Oauth1AccessToken, Oauth2AccessToken } from '@adonisjs/ally/types'
import { withAuthFinder } from '@adonisjs/auth'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { beforeCreate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './app_base_model.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(AppBaseModel, AuthFinder) {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column({ serializeAs: null })
  declare email: string | null

  @column({ serializeAs: 'nickName' })
  declare nickName: string

  @column()
  declare name: string

  @column({ serializeAs: null })
  declare isVerified: boolean

  @column({ serializeAs: 'avatarUrl' })
  declare avatarUrl: string | null

  @column({ serializeAs: null })
  declare accessToken: (Oauth2AccessToken | Oauth1AccessToken)['token']

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'createdAt',
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'updatedAt',
  })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = uuidv4()
  }
}
