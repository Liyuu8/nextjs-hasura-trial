import { VFC } from 'react'

import { useCreateForm } from '../hooks/userCreateForm'
import { Child } from './Child'

export const CreateUser: VFC = () => {
  const {
    printMsg,
    text,
    onTextChange,
    userName,
    onUserNameChange,
    handleSubmit,
  } = useCreateForm()

  return (
    <>
      {console.log('CreateUser rendered.')}
      <p className="mb-4 font-bold">Custom Hook + useCallback + memo</p>

      <div className="mb-3 flex flex-col justify-center items-center">
        <label className="mb-1">Text</label>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300"
          value={text}
          onChange={onTextChange}
        />
      </div>

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label className="mb-1">UserName</label>
        <input
          type="text"
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New User Name"
          value={userName}
          onChange={onUserNameChange}
        />

        <button
          className="mb-6 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>

      <Child printMsg={printMsg} handleSubmit={handleSubmit} />
    </>
  )
}
