import Dashboard from 'views/dashboard/dashboard'
import Users from 'views/users/users'
import User from 'views/user/user'
import Login from 'views/login/login'
import NotFound from 'views/notFound/notFound'
import Profile from 'views/profile/profile'
import SignUp from 'views/signUp/signUp'

const routes = {
    LOGIN: {
        path: '/',
        view: Login,
        auth: ['unprotected']
    },
    SIGNUP: {
        path: '/sign-up',
        view: SignUp,
        auth: ['unprotected']
    },
    DASHBOARD: {
        path: '/dashboard',
        view: Dashboard,
        auth: ['protected']
    },
    ADMIN: {
        path: '/users',
        view: Users,
        auth: ['protected']
    },
    USER: {
        path: '/user/:id',
        view: User,
        auth: ['protected']
    },
    PROFILE: {
        path: '/profile',
        view: Profile,
        auth: ['protected']
    },
    NOT_FOUND: {
        view: NotFound,
        auth: ['unprotected']
    }
}

const separatedRoutes = Object.keys(routes).reduce(
    (acc, key) => {
        const current = routes[key]
        current.auth.map(auth => {
            acc[auth][key] = current
        })
        return acc
    },
    {
        protected: {},
        unprotected: {}
    }
)

export default separatedRoutes
