import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/users'

export default class extends BaseSeeder {
  public async run() {
    
    await User.create({
      fullName: 'Usuario de Teste',
      email: 'teste@teste.com',
      password: 'password123',
    })

    await User.create({
      fullName: 'Admin VLR',
      email: 'admin@vlrskins.com',
      password: 'adminpassword',
    })
  }
}