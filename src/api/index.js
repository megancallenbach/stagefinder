import client from './client'

class API {
  constructor() {
    this.app = client
  }

  service(serviceName) {
    return this.app.service(serviceName)
  }

  authenticate() {
    return this.app.authenticate()
  }

  signIn({ email, password }) {
  return this.app.authenticate({
    strategy: 'local',
    email,
    password
  })
  .then((response) => {
    return this.app.passport.verifyJWT(response.accessToken);
  })
  .then((payload) => {
    return this.app.service('users').get(payload.userId);
  })
  .catch((error) => {
    console.error(error)
  })
}

  signOut() {
    return this.app.logout()
  }
}

export default API
