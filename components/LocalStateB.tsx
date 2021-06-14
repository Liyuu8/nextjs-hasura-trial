import { VFC } from 'react'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

import { todoVar } from '../cache'

export const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar)

  return (
    <>
      <p className="mb-5 font-bold">useReactiveVar</p>
      {todos.map((todo, index) => (
        <p className="mb-3 y-1" key={index}>
          ・{todo.title}
        </p>
      ))}

      <Link href="/local-state-a">
        <a className="mt-3">Back</a>
      </Link>
    </>
  )
}
