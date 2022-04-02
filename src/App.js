import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Form from "./components/Form";
import TypeSummary from "./components/TypeSummary";
import PointsChart from './components/PointsChart';
import { fetchStatusPointsRequest } from './reducers/statusPoints';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchStatusPointsRequest()));

  return (
    <>
      <Form />
      <div className="grid">
        <div className="col-12 md:col-2">
          <TypeSummary />
        </div>
        <div className="col-12 md:col-10">
          <PointsChart />
        </div>
      </div>
    </>
  );
};

export default App;
