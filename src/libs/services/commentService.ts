import realworldAPI from '../api/realworldAPI'

export interface AddCommentModel {
  comment: AddCommentModel
}

export interface AddCommentModel {
  body: string
}

export interface SingleCommentViewModel {
  comment: Comment
}

export interface MultipleCommentsViewModel {
  comments: Comment[]
}

export interface Comment {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: Author
}

export interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}

class CommentService {
  addComments(slug: string, data: AddCommentModel) {
    return realworldAPI.post<MultipleCommentsViewModel>(`/api/articles/${slug}/comments`, data)
  }

  getComments(slug: string) {
    return realworldAPI.get<MultipleCommentsViewModel>(`/api/articles/${slug}/comments`)
  }

  deleteComment(slug: string, id: number) {
    return realworldAPI.delete(`/api/articles/${slug}/comments/${id}`)
  }
}
export const commentService = new CommentService()
