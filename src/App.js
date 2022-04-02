import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Form from "./components/Form";
import TypeSummary from "./components/TypeSummary";
import { fetchStatusPointsRequest } from './reducers/statusPoints';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchStatusPointsRequest()));

  return (
    <>
      <Form />
      <TypeSummary />
    </>
  );
};

export default App;
