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

describe('User Detail Test Cases', () => {
  it('Should render the user detail pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({ route: '/users/test_user_1' })
    render(page)

    expect(await screen.findByText('User Detail')).toBeInTheDocument()
    expect(screen.getByText('Test User 1')).toBeInTheDocument()
    expect(screen.getByText('ID: test_user_1')).toBeInTheDocument()
    expect(
      screen.getByText('2021-06-16T15:01:21.977163+00:00')
    ).toBeInTheDocument()

    // 一覧ページへ
    userEvent.click(screen.getByTestId('back-to-main'))
    expect(await screen.findByText('SSG + ISR')).toBeInTheDocument()

    // 再び詳細ページへ
    userEvent.click(screen.getByTestId('link-user-test_user_2'))
    expect(await screen.findByText('User Detail')).toBeInTheDocument()
    expect(screen.getByText('Test User 2')).toBeInTheDocument()
    expect(screen.getByText('ID: test_user_2')).toBeInTheDocument()
    expect(
      screen.getByText('2021-06-16T15:02:21.977163+00:00')
    ).toBeInTheDocument()
  })
})
