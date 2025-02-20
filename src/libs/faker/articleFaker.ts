import { faker } from '@faker-js/faker'
import type {
  Article,
  MultipleArticleViewModel,
  SingleArticleViewModel
} from '../services/articleService'
import { profileFaker } from './profileFaker'

export const articleFaker = (author?: string, slug?: string): Article => {
  return {
    slug: slug || faker.lorem.slug(),
    title: faker.book.title(),
    description: faker.lorem.lines(1),
    body: faker.lorem.lines(),
    tagList: [faker.lorem.word(), faker.lorem.word()],
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    favorited: faker.datatype.boolean(),
    favoritesCount: faker.number.int({ min: 0, max: 100 }),
    author: profileFaker(author)
  }
}

export const singleArticleFaker = (author?: string, slug?: string): SingleArticleViewModel => {
  return {
    article: articleFaker(author, slug)
  }
}

export const multipleArticleFaker = (author?: string): MultipleArticleViewModel => {
  const articles = Array.from({ length: 10 }, () => articleFaker(author))

  return {
    articles: articles,
    articlesCount: articles.length
  }
}
