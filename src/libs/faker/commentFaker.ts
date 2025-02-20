import { faker } from '@faker-js/faker'
import { profileFaker } from './profileFaker'
import type {
  Comment,
  MultipleCommentsViewModel,
  SingleCommentViewModel
} from '../services/commentService'

export const commentFaker = (slug?: string): Comment => {
  return {
    id: faker.number.int(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    body: faker.lorem.lines(),
    author: profileFaker()
  }
}

export const singleCommentFaker = (slug?: string): SingleCommentViewModel => {
  return {
    comment: commentFaker(slug)
  }
}

export const multipleCommentFaker = (slug?: string): MultipleCommentsViewModel => {
  const comments = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
    commentFaker(slug)
  )

  return {
    comments: comments
  }
}
