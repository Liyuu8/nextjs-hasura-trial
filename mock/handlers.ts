import { graphql } from 'msw'

export const handlers = [
  graphql.query('GetUsers', (req, res, context) =>
    res(
      context.data({
        users: [1, 2, 3].map((index) => ({
          __typename: 'users',
          id: `test_user_${index}`,
          name: `Test User ${index}`,
          created_at: `2021-06-16T15:0${index}:21.977163+00:00`,
        })),
      })
    )
  ),
  graphql.query('GetUserIds', (req, res, context) =>
    res(
      context.data({
        users: [1, 2, 3].map((index) => ({
          __typename: 'users',
          id: `test_user_${index}`,
        })),
      })
    )
  ),
  graphql.query('GetUserById', (req, res, context) => {
    const { id } = req.variables

    return res(
      context.data({
        users_by_pk: [1, 2, 3]
          .map((index) => ({
            __typename: 'users',
            id: `test_user_${index}`,
            name: `Test User ${index}`,
            created_at: `2021-06-16T15:0${index}:21.977163+00:00`,
          }))
          .find((user) => user.id === id),
      })
    )
  }),
]
