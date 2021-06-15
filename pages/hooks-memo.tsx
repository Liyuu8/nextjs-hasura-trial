import { VFC } from 'react'

import { Layout } from '../components/Layout'
import { CreateUser } from '../components/CreateUser'

const HooksMemo: VFC = () => (
  <Layout title="Hooks Memo">
    <CreateUser />
  </Layout>
)

export default HooksMemo