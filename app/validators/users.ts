// app/validators/user.ts

import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3),

    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),

    password: vine.string().minLength(6).confirmed(),
  })
)