import { useParams } from 'react-router-dom';

const SingleAnecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdoteId = Number(id);
  const anecdote = anecdotes.find(a => a.id === anecdoteId);

  if (!anecdote) {
    return <div>Sorry, anecdote not found.</div>;
  }

  return (
    <div>
      <h2>Anecdote Details</h2>
      <p>{anecdote.content}</p>
      <p>Author: {anecdote.author}</p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  );
};

export default SingleAnecdote;
