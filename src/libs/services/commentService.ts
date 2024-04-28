import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import realworldAPI from '../api/realworldAPI'
import appConst from '@/appConst'

export interface AddCommentModel {
  comment: AddCommentBody
}

export interface AddCommentBody {
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
  queryList: {
    [slug: string]: UseQueryReturnType<Comment[], Error>
  } = {}

  query(slug: string) {
    if (!this.queryList[slug]) {
      this.queryList[slug] = useQuery({
        queryKey: [this.getComments.name, slug],
        queryFn: () => this.getComments(slug).then((res) => res.data.comments),
        staleTime: appConst.StaleTime
      })
    }

    return this.queryList[slug]
  }

  addComments(slug: string, data: AddCommentModel) {
    return realworldAPI.post<SingleCommentViewModel>(`/api/articles/${slug}/comments`, data)
  }

  getComments(slug: string) {
    return realworldAPI.get<MultipleCommentsViewModel>(`/api/articles/${slug}/comments`)
  }

  deleteComment(slug: string, id: number) {
    return realworldAPI.delete(`/api/articles/${slug}/comments/${id}`)
  }
}
export const commentService = new CommentService()
