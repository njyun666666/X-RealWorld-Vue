import { setupWorker } from 'msw/browser'
import { userHandlers } from './userHandlers'
import { articleHandlers } from './articleHandlers'
import { tagHandlers } from './tagHandlers'
import { commentHandlers } from './commentHandlers'
import { profileHandlers } from './profileHandlers'

export const worker = setupWorker(
  ...profileHandlers,
  ...commentHandlers,
  ...tagHandlers,
  ...userHandlers,
  ...articleHandlers
)
