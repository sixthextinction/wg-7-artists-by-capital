import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// the middleware will run for all requests that match this pattern,
// we don't actually need to define an api route for this.
export const config = {
  matcher: '/api/wg/:function*',
}

export function middleware(request: NextRequest) {
  // retrieve the session token from the cookie
  const token = request.cookies.get('next-auth.session-token')?.value

  let pathname = request.nextUrl.pathname.replace('/api/wg', '')

  // rewrite the api url to the WunderGraph API
  const url = new URL(
    pathname + request.nextUrl.search,
    'http://127.0.0.1:9991'
  )

  // add the token to the Authorization header
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  })

  // rewrite the request to the WunderGraph API
  const response = NextResponse.rewrite(url, {
    request: {
      headers,
    },
  })

  return response
}