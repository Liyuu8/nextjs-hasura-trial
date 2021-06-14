import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'

import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS)

  return (
    <Layout title="Hasura fetchPolicy">
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <p className="mb-6 font-bold">Fetch Hasura Data (User.name)</p>

          {console.log(data)}
          {data?.users.map((user) => (
            <p className="my-1" key={user.id}>
              {user.name}
            </p>
          ))}

          <Link href="/hasura-sub">
            <a className="mt-6">Next</a>
          </Link>
        </>
      )}
    </Layout>
  )
}

export default FetchMain
