import type { HttpContext } from '@adonisjs/core/http'
import { authValidator } from '#validators/auth' 
import User from '#models/users'

export default class AuthController {
  
  public async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  public async store({ auth, request, response, session }: HttpContext) {
    
    const { email, password } = await request.validateUsing(authValidator) 

    let user: User
    try {
      user = await User.verifyCredentials(email, password)

    } catch (exception) {
      session.flash('error', 'Não encontramos nenhuma conta com essas credenciais.')
      return response.redirect().back()
    }

    await auth.use('web').login(user)

    session.flash('success', 'Login realizado com sucesso!')
    return response.redirect().toRoute('show.profile')
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout() 
    return response.redirect().toRoute('auth.login')
  }
}