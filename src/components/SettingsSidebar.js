import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { sidebarVisibility, updateSettings } from '../reducers/settingsSidebar';

const SettingsSidebar = () => {
    const [silver, setSilver] = useState();
    const [gold, setGold] = useState();
    const [elite, setElite] = useState();

    const visible = useSelector(state => state.settingsSidebar.visible);
    const points = useSelector(state => state.settingsSidebar.settings.points);

    useEffect(() => {
        setSilver(points.silver);
        setGold(points.gold);
        setElite(points.elite);
    }, [points]);

    const dispatch = useDispatch();

    const hideSidebar = () => {
        dispatch(sidebarVisibility(false));
    };

    const saveSettings = () => {
        dispatch(updateSettings({ points: { silver, gold, elite } }));
    };

    return (
        <Sidebar visible={visible} position="right" onHide={hideSidebar}>
            <div className="flex flex-column h-full">
                <h2>Settings</h2>
                <div className="flex-auto">
                    <div className="field">
                        <label htmlFor="silver">Points to achieve Silver Status</label>
                        <InputNumber id="silver" className="w-full" value={silver} onValueChange={({ value }) => setSilver(value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="gold">Points to achieve Gold Status</label>
                        <InputNumber id="gold" className="w-full" value={gold} onValueChange={({ value }) => setGold(value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="elite">Points to achieve Elite Status</label>
                        <InputNumber id="elite" className="w-full" value={elite} onValueChange={({ value }) => setElite(value)} />
                    </div>
                </div>
                <Button className="field" label="Save" onClick={saveSettings}/>
            </div>
        </Sidebar>
    )
};

export default SettingsSidebar;