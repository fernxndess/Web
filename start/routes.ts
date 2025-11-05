/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'



const ImagesController = () => import('#controllers/images_controller')
const UsersController = () => import('#controllers/users_controller')
const ProductsController = () => import('#controllers/products_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async ({ view }) => {
  return view.render('home')
})

router.get('/register', [UsersController, 'create']).as('users.create')
router.post('/register', [UsersController, 'store']).as('users.store')


router.get('/login', [AuthController, 'showLogin']).as('auth.login')
router.post('/login', [AuthController, 'store']).as('auth.storeLogin')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')

router.group(() => {
  router.resource('/products', ProductsController).as('products')

  router.get('/images/:name', [ImagesController, 'show']).as('images.show')

  router.get('/profile', [UsersController, 'show']).as('users.show')
}).use(middleware.auth())

