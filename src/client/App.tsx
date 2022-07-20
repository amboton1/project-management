import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

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
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="app">
            <Header />
            <main className="mx-9">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
