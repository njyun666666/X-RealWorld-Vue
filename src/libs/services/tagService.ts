import realworldAPI from '../api/realworldAPI'

export interface Tag {
  tags: string[]
}

class TagService {
  getTags() {
    return realworldAPI.get<Tag>(`/api/tags`)
  }
}
export const tagService = new TagService()
