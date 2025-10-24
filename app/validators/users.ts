import vine from '@vinejs/vine'


export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(50),
    email: vine.string().email().trim(),
    password: vine.string().minLength(8).maxLength(128),
  })
)