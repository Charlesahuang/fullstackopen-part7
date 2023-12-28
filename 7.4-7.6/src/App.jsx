import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './compoment/Menu';
import AnecdoteList from './pages/AnecdoteList';
import About from './pages/About';
import Footer from './compoment/Footer';
import CreateNew from './pages/CreateNew';
import SingleAnecdote from './pages/SingleAnecdote';
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))


    setNotification('Anecdote created successfully.'+anecdote.info);

    setTimeout(() => {
      setNotification('');
    }, 5000);
  }
  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        {notification && (
          <div style={{ background: 'lightgreen', padding: '10px', textAlign: 'center' }}>
            {notification}
          </div>
        )}
        <Switch>
          <Route path="/" exact>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route exact path="/create" >
            <CreateNew addNew={addNew} component={CreateNew} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/anecdotes/:id">
            <SingleAnecdote anecdotes={anecdotes} />
          </Route>


        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App
