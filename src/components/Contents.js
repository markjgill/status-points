import TypeSummary from "./TypeSummary";
import PointsSummary from './PointsSummary';
import PointsChart from './PointsChart';
import PointsTable from "./PointsTable";
import Message from "./Message";

const Contents = () => (
    <div className="px-3 pt-3">
        <div className="grid">
            <div className="col-12 md:col-2 flex flex-column justify-content-between">
                <Message />
                <PointsSummary />
                <TypeSummary />
            </div>
            <div className="hidden md:block md:col-10">
                <PointsChart />
            </div>
            <div className="col-12 md:hidden">
                <PointsTable />
            </div>
        </div>
    </div>
);

export default Contents;