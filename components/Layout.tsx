import { ReactNode, VFC } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Props {
  children: ReactNode
  title: string
}

export const Layout: VFC<Props> = ({
  children,
  title = 'Welcome to Nextjs',
}) => {
  const navList = [
    { id: 'home', title: 'Home', href: '/' },
    { id: 'makevar', title: 'MakeVar', href: '/local-state-a' },
    { id: 'fetchpolicy', title: 'FetchPolicy(Hasura)', href: '/hasura-main' },
    { id: 'crud', title: 'CRUD(Hasura)', href: '/hasura-crud' },
    { id: 'ssg', title: 'SSG+ISR(Hasura)', href: '/hasura-ssg' },
    { id: 'memo', title: 'Custom Hook+Memo', href: '/hooks-memo' },
  ]

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              {navList.map((nav) => (
                <Link href={nav.href} key={nav.id}>
                  <a
                    data-testid={nav.id + '-nav'}
                    className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    {nav.title}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>

      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
