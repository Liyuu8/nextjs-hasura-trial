/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import 'setimmediate'

import { handlers } from '../mock/handlers'

process.env.NEXT_PUBLIC_HASURA_URL =
  'https://hasura-trial.hasura.app/v1/graphql'

initTestHelpers()

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('Hasura Fetch Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    const { page } = await getPage({ route: '/hasura-main' })
    render(page)

    expect(
      await screen.findByText('Fetch Hasura Data (User.name)')
    ).toBeInTheDocument()

    expect(await screen.findByText('Test User 1')).toBeInTheDocument()
    expect(screen.getByText('Test User 2')).toBeInTheDocument()
    expect(screen.getByText('Test User 3')).toBeInTheDocument()
  })
})
