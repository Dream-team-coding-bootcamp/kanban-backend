import { createNamespace } from 'cls-hooked'

const namespace = createNamespace('user-context')

const setUserContext = (req, res, next) => {
    namespace.run(() => {
        if (req.user) { // Check if req.user exists (optional)
            namespace.set('user_id', req.user.id)
        }
        next()
    })
}

export default setUserContext