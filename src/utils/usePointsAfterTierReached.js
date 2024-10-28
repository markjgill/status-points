import { useSelector } from "react-redux";
import { DateTime, Interval } from "luxon";

import useTierReachedDate from "./useTierReachedDate";

const usePointsAfterTierReached = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);
    const tierReachedDate = useTierReachedDate();

    const endOfToday = DateTime.now().endOf("day");
    const tierReachedDateToToday = Interval.fromDateTimes(tierReachedDate.plus({ days: 1 }), endOfToday);
    
    return statusPoints.filter(({ date }) => tierReachedDateToToday.contains(DateTime.fromISO(date)))
        .map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);
};

export default usePointsAfterTierReached;