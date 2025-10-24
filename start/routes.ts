/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ProductsController = () => import('#controllers/products_controller')

router.resource('/products', ProductsController).as('products')

router.resource('/users', () => import('#controllers/users_controller')).as('users')

router.group(() => {router.get('/login', async ({ view }) => {return view.render('pages/auth/login') }).as('login.show')

router.post('/login', () => import('#controllers/auth_controller.store')).as('login.store')

router.post('/logout', () => import('#controllers/auth_controller.destroy')).as('logout')}).prefix('/auth')

router.get('/', async ({ view }) => {
  return view.render('home')
})
