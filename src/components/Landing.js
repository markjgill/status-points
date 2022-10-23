import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { always, compose, cond, defaultTo, find, gte, map, prop, pluck, T, __ } from 'ramda';

import Header from './Header';
import Contents from './Contents';
import SettingsSidebar from './SettingsSidebar';
import { fetchSettingsRequest } from '../reducers/settings';
import {
  fetchStatusPointsRequest,
  setCurrentPoints,
  setCurrentTier,
  setTierReachedDate,
  setPointsAfterTierReached
} from '../reducers/statusPoints';

const Landing = () => {
  const dispatch = useDispatch();
  const statusPoints = useSelector(state => state.statusPoints.statusPoints);
  const points = useSelector(state => state.settings.points);

  const endOfToday = DateTime.now().endOf("day");
  const lastTwelveMonths = Interval.fromDateTimes(endOfToday.minus({ months: 12 }), endOfToday);
  const currentPoints = statusPoints.filter(({ date }) => lastTwelveMonths.contains(date))
    .map(({ points }) => points)
    .reduce((acc, val) => acc + val, 0);

  const { silver, gold, elite } = points;
  const currentTier = cond([
    [gte(__, elite), always("eiite")],
    [gte(__, gold), always("gold")],
    [gte(__, silver), always("silver")],
    [T, always("none")]
  ])(currentPoints);

  const tierReachedDate = compose(
    defaultTo(DateTime.fromMillis(0)),
    prop("date"),
    find(({ pointsToDate }) => pointsToDate >= points[currentTier]),
    map(date => ({
      date,
      pointsToDate: statusPoints.filter(({ date: d }) =>
        Interval.fromDateTimes(date.minus({ months: 12 }), date.endOf("day"))
          .contains(d))
          .map(({ points }) => points)
          .reduce((acc, val) => acc + val, 0)
    })),
    pluck("date")
  )(statusPoints);

  const tierReachedDateToToday = Interval.fromDateTimes(tierReachedDate.plus({ days: 1 }), endOfToday);
  const pointsAfterTierReached = statusPoints.filter(({ date }) => tierReachedDateToToday.contains(date))
    .map(({ points }) => points)
    .reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    dispatch(fetchSettingsRequest());
    dispatch(fetchStatusPointsRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPoints(currentPoints));
    dispatch(setCurrentTier(currentTier));
    dispatch(setTierReachedDate(tierReachedDate));
    dispatch(setPointsAfterTierReached(pointsAfterTierReached))
  }, [dispatch, currentPoints, currentTier, tierReachedDate, pointsAfterTierReached]);

  return (
    <>
      <Header />
      <Contents />
      <SettingsSidebar />
    </>
  );
};

export default Landing;
