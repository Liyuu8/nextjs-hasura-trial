/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import 'setimmediate'

import { handlers } from '../mock/handlers'

initTestHelpers()

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('SSG Test Cases', () => {
  it('Should render the list of users pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({ route: '/hasura-ssg' })
    render(page)

    expect(await screen.findByText('SSG + ISR')).toBeInTheDocument()

    expect(screen.getByText('Test User 1')).toBeInTheDocument()
    expect(screen.getByText('Test User 2')).toBeInTheDocument()
    expect(screen.getByText('Test User 3')).toBeInTheDocument()
  })
})
