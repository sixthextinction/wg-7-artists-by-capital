import { createWunderGraphNext } from '../components/generated/nextjs'

const {
  client,
  withWunderGraph,
  useQuery,
  useMutation,
  useSubscription,
  useFileUpload,
} = createWunderGraphNext({
  // baseURL: 'http://localhost:3000/api/wg',
  baseURL: 'https://wg-7-artists-by-capital-v2.vercel.app/api/wg',
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