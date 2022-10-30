import { useSelector } from "react-redux";
import { compose, defaultTo, find, pluck, prop, map } from "ramda";
import { DateTime, Interval } from "luxon";

import useCurrentTier from "./useCurrentTier";

const useTierReachedDate = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);
    const points = useSelector(state => state.settings.points);

    const currentTier = useCurrentTier();

    return compose(
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
};

export default useTierReachedDate;