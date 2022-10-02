import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { always, cond, gte, T, __ } from 'ramda';

import Header from './components/Header';
import Contents from './components/Contents';
import SettingsSidebar from './components/SettingsSidebar';
import { fetchStatusPointsRequest, setCurrentPoints, setCurrentTier } from './reducers/statusPoints';
import { fetchSettingsRequest } from './reducers/settings';

const App = () => {
  const dispatch = useDispatch();
  const statusPoints = useSelector(state => state.statusPoints.statusPoints);
  const { silver, gold, elite } = useSelector(state => state.settings.points);

  const endOfToday = DateTime.now().endOf("day");
  const lastTwelveMonths = Interval.fromDateTimes(endOfToday.minus({ months: 12 }), endOfToday);
  const currentPoints = statusPoints.filter(({ date }) => lastTwelveMonths.contains(date))
    .map(({ points }) => points)
    .reduce((acc, val) => acc + val, 0);

  const currentTier = cond([
    [gte(__, elite), always("eiite")],
    [gte(__, gold), always("gold")],
    [gte(__, silver), always("silver")],
    [T, always("none")]
  ])(currentPoints);

  useEffect(() => {
    dispatch(fetchSettingsRequest());
    dispatch(fetchStatusPointsRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPoints(currentPoints));
    dispatch(setCurrentTier(currentTier));
  }, [dispatch, currentPoints, currentTier]);

  return (
    <>
      <Header />
      <Contents />
      <SettingsSidebar />
    </>
  );
};

export default App;
