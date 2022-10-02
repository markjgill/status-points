import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import { sidebarVisibility, updateSettings } from '../reducers/settings';

const SettingsSidebar = () => {
    const [silver, setSilver] = useState();
    const [gold, setGold] = useState();
    const [elite, setElite] = useState();
    const [tierRetention, setTierRetention] = useState();
    const [tier, setTier] = useState();

    const { visible, currentTier, retention, points } = useSelector(state => state.settings);

    useEffect(() => {
        setSilver(points.silver);
        setGold(points.gold);
        setElite(points.elite);
        setTierRetention(retention);
        setTier(currentTier);
    }, [points, retention, currentTier]);

    const dispatch = useDispatch();

    const hideSidebar = () => {
        dispatch(sidebarVisibility(false));
    };

    const saveSettings = () => {
        dispatch(updateSettings({ tier, tierRetention, silver, gold, elite }));
        hideSidebar();
    };

    const tierOptions = [
        { label: "None", value: "none" },
        { label: "Silver", value: "silver" },
        { label: "Gold", value: "gold" },
        { label: "Elite", value: "elite" }
    ];

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
                    <div className="field">
                        <lavel htmlFor="retention">Percentage of points to retain tier</lavel>
                        <InputNumber id="retention" className="w-full" value={tierRetention} suffix="%" onValueChange={({ value }) => setTierRetention(value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="tier">Current Tier</label>
                        <Dropdown id="tier" className="w-full" value={tier} options={tierOptions} onChange={({ value }) => setTier(value)} />
                    </div>
                </div>
                <Button className="field" label="Save" onClick={saveSettings}/>
            </div>
        </Sidebar>
    )
};

export default SettingsSidebar;