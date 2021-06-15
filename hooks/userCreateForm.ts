import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_USER } from '../queries/queries'
import { CreateUserMutation } from '../types/generated/graphql'

export const useCreateForm = () => {
  const [text, setText] = useState('')
  const [userName, setUserName] = useState('')

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

  const onTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value),
    []
  )
  const onUserNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value),
    []
  )

  // useCallback: Child component の再レンダリング対策
  const printMsg = useCallback(() => console.log('Hello'), [])

  // useCallback: Child component の再レンダリング対策
  // text の変更では再レンダリングされないが、userName の変更では再レンダリングされる
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await insertUsersOne({ variables: { name: userName } })
      } catch (err) {
        alert(err.message)
      }

      setUserName('')
    },
    [userName]
  )

  return {
    printMsg,
    text,
    onTextChange,
    userName,
    onUserNameChange,
    handleSubmit,
  }
}
