import { createWunderGraphNext } from '../components/generated/nextjs'

const {
  client,
  withWunderGraph,
  useQuery,
  useMutation,
  useSubscription,
  useFileUpload,
} = createWunderGraphNext({
  baseURL: 'https://wg-7-artists-by-capital.wundergraph.dev/api/wg',
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