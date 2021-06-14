import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'

import { GET_USERS_LOCAL } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchSub: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)

  return (
    <Layout title="Hasura fetchPolicy From Cache">
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <p className="mb-6 font-bold">
            Direct Read Out From Cache (User.name)
          </p>

          {data?.users.map((user) => (
            <p className="my-1" key={user.id}>
              {user.name}
            </p>
          ))}

          <Link href="/hasura-main">
            <a className="mt-6">Back</a>
          </Link>
        </>
      )}
    </Layout>
  )
}

export default FetchSub
