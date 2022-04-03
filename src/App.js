import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Form from "./components/Form";
import TypeSummary from "./components/TypeSummary";
import PointsSummary from './components/PointsSummary';
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
          <div className="grid">
            <div className="col-12">
              <PointsSummary />
            </div>
            <div className="col-12">
              <TypeSummary />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-10">
          <PointsChart />
        </div>
      </div>
    </>
  );
};

export default App;
