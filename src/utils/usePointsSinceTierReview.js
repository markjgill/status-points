import { useSelector } from "react-redux";
import { DateTime, Interval } from "luxon";

const usePointsAfterTierReview = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const tierReviewDate = DateTime.local(2024, 7);
    const endOfToday = DateTime.now().endOf("day");
    const tierReachedDateToToday = Interval.fromDateTimes(tierReviewDate, endOfToday);
    
    return statusPoints.filter(({ date }) => tierReachedDateToToday.contains(DateTime.fromISO(date)))
        .map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);
};

export default usePointsAfterTierReview;