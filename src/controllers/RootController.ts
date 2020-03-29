import {Request, Response, NextFunction} from 'express'
import {get, controller, use} from './decorators'

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next()
    return
  }

  res.status(403).send('Not authorized')
}


@controller('')
class RootController {

  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send('Already logged in - <a href="/auth/logout">Logout</a>')
    } else {
      res.send('Logged out - <a href="/auth/login">Login</a>')
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected page')
  }
}