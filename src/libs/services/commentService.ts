import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import realworldAPI from '../api/realworldAPI'
import appConst from '@/appConst'
import type { Profile } from './profileService'

export interface AddCommentModel extends CommentBase<AddCommentBody> {}
export interface SingleCommentViewModel extends CommentBase<Comment> {}
export interface MultipleCommentsViewModel extends CommentsBase<Comment[]> {}

export interface CommentBase<T> {
  comment: T
}

export interface CommentsBase<T> {
  comments: T
}

export interface AddCommentBody {
  body: string
}

export interface Comment {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: Profile
}

class CommentService {
  readonly addCommentsUrl = '/api/articles/*/comments'
  readonly getCommentsUrl = '/api/articles/*/comments'
  readonly deleteCommentsUrl = '/api/articles/*/comments'

  queryList: {
    [slug: string]: UseQueryReturnType<Comment[], Error>
  } = {}

  reset() {
    this.queryList = {}
  }

  query(slug: string) {
    if (!this.queryList[slug]) {
      this.queryList[slug] = useQuery({
        queryKey: [this.getComments.name, slug],
        queryFn: async () => await this.getComments(slug).then((res) => res.data.comments),
        staleTime: appConst.StaleTime
      })
    }
    return this.queryList[slug]
  }

  addComments(slug: string, data: AddCommentModel) {
    return realworldAPI.post<SingleCommentViewModel>(`/api/articles/${slug}/comments`, data)
  }

  async getComments(slug: string) {
    return realworldAPI
      .get<MultipleCommentsViewModel>(`/api/articles/${slug}/comments`)
      .then((res) => {
        res.data.comments.forEach((item) => {
          item.body = item.body.replace(/\\n/g, '\n')
          item.author.bio = (item.author.bio ?? '').replace(/\\n/g, '\n')
        })

        return res
      })
  }

  deleteComment(slug: string, id: number) {
    return realworldAPI.delete(`/api/articles/${slug}/comments/${id}`)
  }
}
export const commentService = new CommentService()
