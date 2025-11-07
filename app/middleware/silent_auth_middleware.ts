import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Silent auth middleware can be used to authenticate user requests
 * when the user is visiting routes that are not protected by the
 * auth middleware.
 */
export default class SilentAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Check if user is authenticated using the default guard.
     * Feel free to use any guard of your choice.
     */
    
    await ctx.auth.check()

    /**
     * Call next method in the pipeline
     */
    return next()
  }
}