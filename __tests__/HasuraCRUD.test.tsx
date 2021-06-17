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

describe('Hasura CRUD Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    const { page } = await getPage({ route: '/hasura-crud' })
    render(page)

    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()

    // Test User 1
    expect(await screen.findByText('Test User 1,')).toBeInTheDocument()
    expect(
      screen.getByText('2021-06-16T15:01:21.977163+00:00')
    ).toBeInTheDocument()
    expect(screen.getByTestId('edit-user-test_user_1')).toBeTruthy()
    expect(screen.getByTestId('delete-user-test_user_1')).toBeTruthy()

    // Test User 2
    expect(screen.getByText('Test User 2,')).toBeInTheDocument()
    expect(
      screen.getByText('2021-06-16T15:02:21.977163+00:00')
    ).toBeInTheDocument()
    expect(screen.getByTestId('edit-user-test_user_2')).toBeTruthy()
    expect(screen.getByTestId('delete-user-test_user_2')).toBeTruthy()

    // Test User 3
    expect(screen.getByText('Test User 3,')).toBeInTheDocument()
    expect(
      screen.getByText('2021-06-16T15:03:21.977163+00:00')
    ).toBeInTheDocument()
    expect(screen.getByTestId('edit-user-test_user_3')).toBeTruthy()
    expect(screen.getByTestId('delete-user-test_user_3')).toBeTruthy()
  })
})
