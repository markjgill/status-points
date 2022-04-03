import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PointsTable = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const data = statusPoints.map(({ date, type, points }) => ({
        date: date.toLocaleString(DateTime.DATE_HUGE),
        type,
        points: points.toFixed(2)
    }));

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Points</h2>
                <DataTable value={data} paginator stripedRows paginatorTemplate="PrevPageLink PageLinks NextPageLink" rows={10}>
                    <Column field="date" header="Date"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="points" header="Points"></Column>
                </DataTable>
            </div>
        </Card>
    );
};

export default PointsTable;