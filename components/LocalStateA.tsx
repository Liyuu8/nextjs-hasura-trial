import { ChangeEvent, FormEvent, useState, VFC } from 'react'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

import { todoVar } from '../cache'

export const LocalStateA: VFC = () => {
  const [title, setTitle] = useState('')
  const todos = useReactiveVar(todoVar)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    todoVar([...todoVar(), { title }])
    setTitle('')
  }

  return (
    <>
      <p className="mb-5 font-bold">makeVar</p>
      {todos.map((todo, index) => (
        <p className="mb-3 y-1" key={index}>
          ・{todo.title}
        </p>
      ))}

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New Task"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <button
          className="disable:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          disabled={!title}
          type="submit"
        >
          Add New State
        </button>
      </form>

      <Link href="/local-state-b">
        <a className="mt-3">Next</a>
      </Link>
    </>
  )
}
