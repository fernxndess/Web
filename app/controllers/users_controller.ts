import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/users'

import { createUserValidator } from '#validators/users'

export default class UsersController {
  
  public async create({ view }: HttpContext) {

    return view.render('pages/users/create')
  }

  public async store({ request, response }: HttpContext) {

    const payload = await request.validateUsing(createUserValidator)

    const user = await User.create(payload) 

    return response.redirect().toRoute('home')
  }

  public async show({ params, view }: HttpContext) {

    const user = await User.findOrFail(params.id)  

    return view.render('pages/users/show', { user })
  } 

  public async edit({ params, view }: HttpContext) {

    const user = await User.findOrFail(params.id) 

    return view.render('pages/users/edit', { user })
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const payload = await request.validateUsing(createUserValidator)  

    user.merge(payload)
    await user.save()    

    return response.redirect().toRoute('users.show', { id: user.id })
  }

  public async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.redirect().toRoute('home')
  }

  public async index({ view }: HttpContext) {
    const users = await User.all()          
    return view.render('pages/users/index', { users })
  }

}
