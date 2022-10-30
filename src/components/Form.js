import { useState } from "react";
import { DateTime } from "luxon";
import { Calendar } from "primereact/calendar";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

import useSavePoints from "../apis/useSavePoints";

const Form = () => {
    const [date, setDate] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [points, setPoints] = useState(undefined);
    const savePoints = useSavePoints();

    const addStatusPoints = () => {
        savePoints({ date, type, points });
        clearForm();
    };

    const clearForm = () => {
        setDate(undefined);
        setType(undefined);
        setPoints(undefined);
    };

    const types = ['Flight', 'Card'];

    return (
        <div className="formgroup-inline align-items-center">
            <span className="field">
                <Calendar id="calendar" dateFormat="dd M yy" value={date} placeholder="Date" onChange={({ value }) => setDate(DateTime.fromJSDate(value))} />
            </span>
            <span className="field p-float-label">
                <InputNumber id="points" inputId="minmaxfraction" mode="decimal" minFractionDigits={0} maxFractionDigits={2} value={points} placeholder="Points" onValueChange={({ value }) => setPoints(value)} />
            </span>
            <div className="field">
                <SelectButton options={types} value={type} onChange={({ value }) => setType(value)} />
            </div>
            <div className="field">
                <Button icon="pi pi-plus-circle" label="Add" onClick={addStatusPoints} />
            </div>
            <div className="field">
                <Button icon="pi pi-times-circle" label="Clear" onClick={clearForm} />
            </div>
        </div>
    );
};

export default Form;