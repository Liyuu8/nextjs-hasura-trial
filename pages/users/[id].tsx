import { VFC } from 'react'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

import { initializeApollo } from '../../lib/ApolloClient'
import { Layout } from '../../components/Layout'
import { GET_USER_IDS, GET_USER_BY_ID } from '../../queries/queries'
import {
  GetUserIdsQuery,
  GetUserByIdQuery,
  Users,
} from '../../types/generated/graphql'

interface Props {
  user: { __typename: 'users' } & Pick<Users, 'id' | 'name' | 'created_at'>
}

const UserDetail: VFC<Props> = ({ user }) => (
  <Layout title={!user ? 'loading' : user.name}>
    {!user ? (
      'Loading...'
    ) : (
      <>
        <p className="mb-4 text-xl font-bold">User Detail</p>

        <p className="m-4">{`ID: ${user.id}`}</p>
        <p className="mb-4 text-xl">{user.name}</p>
        <p className="mb-12">{user.created_at}</p>

        <Link href="/hasura-ssg">
          <div className="flex cursor-pointer mt-12">
            <ChevronDoubleLeftIcon
              data-testid="auth-to-main"
              className="h-5 w-5 mr-3 text-blue-500"
            />
            <span data-testid="back-to-main">Back</span>
          </div>
        </Link>
      </>
    )}
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USER_IDS,
  })
  const paths = data.users.map((user) => ({ params: { id: user.id } }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USER_BY_ID,
    variables: { id: params.id },
  })

  return { props: { user: data.users_by_pk }, revalidate: 1 }
}

export default UserDetail
