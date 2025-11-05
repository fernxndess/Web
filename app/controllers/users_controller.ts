import User from '#models/users'
import { createUserValidator } from '#validators/users'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

  public async create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  public  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    const user = new User()
    user.merge(payload)

    await user.save()

    return response.redirect().toRoute('auth.create')
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const payload = await request.validateUsing(createUserValidator)
    user.merge(payload)

    await user.save()

    return response.redirect().toRoute('users.show', { id: user.id })
  }

    public async edit({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)
  
    return view.render('pages/users/edit', { user })
  }

  public async show ({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)

    return view.render('pages/users/show', { user })
  }



}