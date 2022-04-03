import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import Contents from './components/Contents';
import { fetchStatusPointsRequest } from './reducers/statusPoints';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchStatusPointsRequest()));

  return (
    <>
      <Header />
      <Contents />
    </>
  );
};

export default App;
