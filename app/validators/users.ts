import vine from '@vinejs/vine'
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

    password: vine
      .string()
      .minLength(6)
      .confirmed(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3),

    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db.from('users')
          .where('email', value)
          .whereNot('id', field.meta.userId)
          .first()
        return !user
      }),

    password: vine
      .string()
      .minLength(6)
      .confirmed()
      .optional(),
  })
)