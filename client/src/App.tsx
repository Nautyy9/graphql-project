
import Header from './components/Header'
import {ApolloClient , ApolloProvider , InMemoryCache} from '@apollo/client'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './apps/Home'
import Project from './apps/Project'
import NotFound from './apps/NotFound'

const client =  new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
           <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
    </ApolloProvider>
  )
}

export default App