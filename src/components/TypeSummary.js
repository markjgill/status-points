import { useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';

const TypeSummary = () => {
    const statusPoints = useSelector(state => state.statusPoints.value);

    const totalPoints = statusPoints.map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);

    const flightsPoints = statusPoints.filter(({ type }) => type === "Flight")
        .map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);

    const value = (flightsPoints / totalPoints) * 100;

    return (
        <Card>
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Flights vs Card</h2>
                <div className="flex justify-content-center">
                    <Knob value={value.toFixed(2)} valueColor={"rgb(0, 255, 0)"} rangeColor={"rgb(255, 0, 0)"} valueTemplate={"{value}%"} readOnly />
                </div>
            </div>
        </Card>
    );
};

export default TypeSummary;