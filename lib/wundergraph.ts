import { createWunderGraphNext } from '../components/generated/nextjs'

const {
  client,
  withWunderGraph,
  useQuery,
  useMutation,
  useSubscription,
  useFileUpload,
} = createWunderGraphNext({
  baseURL: `/api/wg`,
  ssr: true,
})

export {
  client,
  withWunderGraph,
  useQuery,
  useMutation,
  useSubscription,
  useFileUpload,
}