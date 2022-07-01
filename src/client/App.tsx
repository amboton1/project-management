import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Button from './components/Button/Button';
import Client from './components/Client/Client';
import ClientModalForm from './components/ClientModalForm/ClientModalForm';
import Header from './components/Header/Header';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Header />
        <main className="mx-9">
          <ClientModalForm />
          {/* <Button /> */}
          <Client />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
