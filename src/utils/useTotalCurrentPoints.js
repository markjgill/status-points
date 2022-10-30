import { useSelector } from "react-redux";
import { DateTime, Interval } from "luxon";

const useTotalCurrentPoints = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const endOfToday = DateTime.now().endOf("day");
    const lastTwelveMonths = Interval.fromDateTimes(endOfToday.minus({ months: 12 }), endOfToday);

    return statusPoints.filter(({ date }) => lastTwelveMonths.contains(DateTime.fromISO(date)))
        .map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);
};

export default useTotalCurrentPoints;