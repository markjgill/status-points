import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { sidebarVisibility } from '../reducers/settingsSidebar';

const SettingsSidebar = () => {
    const [pointsForSilver, setPointsForSilver] = useState();
    const [pointsForGold, setPointsForGold] = useState();
    const [percentDiscount, setPercentDiscount] = useState();

    const visible = useSelector(state => state.settingsSidebar.visible);
    const settings = useSelector(state => state.settingsSidebar.settings);

    useEffect(() => {
        setPointsForSilver(settings.pointsForSilver);
        setPointsForGold(settings.pointsForGold);
        setPercentDiscount(settings.percentDiscount);
    }, [settings]);

    const dispatch = useDispatch();

    const hideSidebar = () => {
        dispatch(sidebarVisibility(false));
    };

    return (
        <Sidebar visible={visible} position="right" onHide={hideSidebar}>
            <div className="flex flex-column justify-content-between h-full">
                <div>
                    <h2>Settings</h2>
                    <div className="field">
                        <label htmlFor="pointsForSilver">Points to achieve Silver Status</label>
                        <InputNumber className="w-full" value={pointsForSilver} onValueChange={({ value }) => setPointsForSilver(value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="pointsForGold">Points to acheive Gold Status</label>
                        <InputNumber className="w-full" value={pointsForGold} onValueChange={({ value }) => setPointsForGold(value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="percentDiscount">Percentage Discount to retain status</label>
                        <InputNumber className="w-full" value={percentDiscount} suffix="%" onValueChange={({ value }) => setPercentDiscount(value)} />
                    </div>
                </div>
                <Button className="field" label="Save" />
            </div>
        </Sidebar>
    )
};

export default SettingsSidebar;