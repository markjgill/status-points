import TypeSummary from "./TypeSummary";
import PointsSummary from './PointsSummary';
import PointsChart from './PointsChart';
import PointsTable from "./PointsTable";
import Message from "./Message";

const Contents = () => (
    <div className="flex flex-column md:flex-row m-1">
        <div className="flex flex-column justify-content-between">
            <div className="m-2">
                <Message />
            </div>
            <div className="m-2">
                <PointsSummary />
            </div>
            <div className="m-2">
                <TypeSummary />
            </div>
        </div>
        <div className="flex-auto m-2 hidden md:block">
            <PointsChart />
        </div>
        <div className="m-2 md:hidden">
            <PointsTable />
        </div>
    </div>
);

export default Contents;