import { always, cond, gte, T, __ } from "ramda";
import { useSelector } from "react-redux";

import useTotalCurrentPoints from "./useTotalCurrentPoints";

const useCurrentTier = () => {
    const { silver, gold, elite } = useSelector(state => state.settings.points);
    const currentPoints = useTotalCurrentPoints();

    return "gold";

    // return cond([
    //     [gte(__, elite), always("eiite")],
    //     [gte(__, gold), always("gold")],
    //     [gte(__, silver), always("silver")],
    //     [T, always("none")]
    //   ])(currentPoints);
};

export default useCurrentTier;