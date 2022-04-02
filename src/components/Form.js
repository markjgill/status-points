import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { addStatusPointsRequest } from '../reducers/statusPoints';

const Form = () => {
    const [date, setDate] = useState(null);
    const [type, setType] = useState(null);
    const [points, setPoints] = useState(null);

    const dispatch = useDispatch();

    const addStatusPoints = () => {
        dispatch(addStatusPointsRequest({ date: date.toISOString(), type, points }));
        clearForm();
    };

    const clearForm = () => {
        setDate(null);
        setType(null);
        setPoints(null);
    };

    const types = ['Flight', 'Card'];

    return (
        <div className="grid align-items-center">
            <div className="p-fluid col-12 md:col-2">
                <span className="p-float-label">
                    <Calendar id="date" dateFormat="dd M yy" value={date} onChange={({ value }) => setDate(value)} />
                    <label htmlFor="date">Date</label>
                </span>
            </div>
            <div className="p-fluid col-12 md:col-2">
                <span className="p-float-label">
                    <InputNumber id="points" inputId="minmaxfraction" mode="decimal" minFractionDigits={0} maxFractionDigits={2} value={points} onValueChange={({ value }) => setPoints(value)} />
                    <label htmlFor="points">Points</label>
                </span>
            </div>
            <div className="p-fluid col-12 md:col-2">
                <SelectButton options={types} value={type} onChange={({ value }) => setType(value)} />
            </div>
            <div className="col-12 md:col-2">
                <div className="grid">
                    <div className="p-fluid col-6 md:col-4">
                        <Button icon="pi pi-plus-circle" label="Add" onClick={addStatusPoints} />
                    </div>
                    <div className="p-fluid col-6 md:col-4">
                        <Button icon="pi pi-times-circle" label="Clear" onClick={clearForm} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Form;