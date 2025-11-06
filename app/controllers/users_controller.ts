import User from '#models/users'
import { updateUserValidator } from '#validators/users'
import { createUserValidator } from '#validators/users'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

  public async create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  public async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    const user = await User.create(data)
    await auth.use('web').login(user)

    session.flash('success', 'Conta criada com sucesso!')
    return response.redirect().toRoute('home')
  }

  public async update({ params, request, response, session }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const payload = await request.validateUsing(updateUserValidator, {
      meta: { userId: user.id }
    })

    if (!payload.password) {
      delete payload.password
    }
    user.merge(payload)
    await user.save()

    session.flash('success', 'Perfil atualizado com sucesso!')
    return response.redirect().toRoute('show.profile')
  }

  public async edit({ auth, view }: HttpContext) {
    const user = auth.user!

    return view.render('pages/users/create', { user })
  }

  public async show({ auth, view }: HttpContext) {
    const user = auth.user!

    return view.render('pages/users/profile', { user })
  }

  public async destroy({ auth, response }: HttpContext) {
    const user = auth.user!
    await user.delete()
    return response.redirect().toRoute('home')
  }

}