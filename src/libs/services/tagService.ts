import realworldAPI from '../api/realworldAPI'

export interface Tag {
  tags: string[]
}

class TagService {
  readonly getTagsUrl = '/api/tags'

  getTags() {
    return realworldAPI.get<Tag>(this.getTagsUrl)
  }
}
export const tagService = new TagService()
