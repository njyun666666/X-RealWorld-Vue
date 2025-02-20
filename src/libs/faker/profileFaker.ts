import { faker } from '@faker-js/faker'
import type { Profile, ProfileViewModel } from '../services/profileService'

export const profileFaker = (username?: string): Profile => {
  return {
    username: username || faker.person.firstName(),
    bio: faker.person.bio(),
    image: faker.image.avatar(),
    following: faker.datatype.boolean()
  }
}

export const getProfileFaker = (username?: string): ProfileViewModel => {
  return {
    profile: profileFaker(username)
  }
}
