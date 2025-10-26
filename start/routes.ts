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

router.get('/', async ({ view }) => {
  return view.render('home')
})
