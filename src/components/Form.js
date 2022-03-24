import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

const Form = () => {
    const [date, setDate] = useState(null);
    const [type, setType] = useState(null);
    const [points, setPoints] = useState(null);

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
            <div className="col-12 md:col-1">
                <Button icon="pi pi-plus-circle" label="Add" />
            </div>
        </div>
    )
}

export default Form;