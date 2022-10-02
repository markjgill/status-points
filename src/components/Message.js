import { useSelector } from 'react-redux';
import { always, cond, equals, T } from 'ramda';
import { Card } from 'primereact/card';

const Message = () => {
    const currentPoints = useSelector(state => state.statusPoints.currentPoints);
    const currentTier = useSelector(state => state.settings.currentTier);
    const { silver, gold, elite } = useSelector(state => state.settings.points);

    const { tier, points } = cond([
        [equals("silver"), always({ tier: "gold", points: gold })],
        [equals("gold"), always({ tier: "elite", points: elite })],
        [equals("elite"), always({ tier: "elite", points: elite })],
        [T, always({ tier: "silver", points: silver })]
    ])(currentTier);

    return (
        <Card className="border-1 bg-green-200">
            <h4 className="m-0 text-center">You are {points - Math.trunc(currentPoints)} points away from {tier} status</h4>
        </Card>
   );
};

export default Message;