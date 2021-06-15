import { VFC, useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { Layout } from '../components/Layout'
import { UserItem } from '../components/UserItem'
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql'

const HasuraCRUD: VFC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })

  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  const [updateUsersByPk] = useMutation<UpdateUserMutation>(UPDATE_USER)
  const [insertUsersOne] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one)
      // キャッシュ更新
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers]
          },
        },
      })
    },
  })
  const [deleteUsersByPk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      // キャッシュ更新
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (editedUser.id) {
        await updateUsersByPk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } else {
        await insertUsersOne({
          variables: {
            name: editedUser.name,
          },
        })
      }
    } catch (err) {
      alert(err.message)
    }

    setEditedUser({ id: '', name: '' })
  }

  return (
    <Layout title="Hasura CRUD">
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <p className="mb-3 font-bold">Hasura CRUD</p>
          <form
            className="flex flex-col justify-center items-center mb-3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="px-3 py-2 border border-gray-300"
              placeholder="New User Name"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />

            <button
              className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:online-none"
              disabled={!editedUser.name}
              data-testid="new-user-button"
              type="submit"
            >
              {editedUser.id ? 'Update' : 'Create'}
            </button>
          </form>

          {data?.users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              setEditedUser={setEditedUser}
              deleteUsersByPk={deleteUsersByPk}
            />
          ))}
        </>
      )}
    </Layout>
  )
}

export default HasuraCRUD
