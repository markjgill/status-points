import { useSelector } from 'react-redux';
import { Card } from 'primereact/card';

const Message = () => {
    const currentPoints = useSelector(state => state.statusPoints.currentPoints);

    return (
        <Card className="border-1 bg-green-200">
            <h4 className="m-0 text-center">You are {450 - currentPoints.toFixed(0)} points away from Silver status</h4>
        </Card>
   );
};

export default Message;