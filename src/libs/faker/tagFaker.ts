import { faker } from '@faker-js/faker'
import type { Tag } from '../services/tagService'

export const tagFaker = (): Tag => {
  return {
    tags: Array.from({ length: 10 }, () => faker.lorem.word())
  }
}
