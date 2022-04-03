import TypeSummary from "./TypeSummary";
import PointsSummary from './PointsSummary';
import PointsChart from './PointsChart';

const Contents = () => (
    <div className="px-3 pt-3">
        <div className="grid">
            <div className="col-12 md:col-2">
            <div className="grid">
                <div className="col-12">
                <PointsSummary />
                </div>
                <div className="col-12">
                <TypeSummary />
                </div>
            </div>
            </div>
            <div className="col-12 md:col-10">
            <PointsChart />
            </div>
        </div>
    </div>
);

export default Contents;