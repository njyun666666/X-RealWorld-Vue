import { faker } from '@faker-js/faker'
import type { UsersLoginViewModel } from '../services/userService'

export const userFaker = (): UsersLoginViewModel => {
  return {
    user: {
      email: faker.internet.email(),
      token: faker.internet.jwt(),
      username: faker.person.fullName(),
      bio: faker.person.bio(),
      image: faker.image.avatar()
    }
  }
}
