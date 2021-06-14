import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import '../styles/globals.css'
import { initializeApollo } from '../lib/ApolloClient'

function MyApp({ Component, pageProps }: AppProps) {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
