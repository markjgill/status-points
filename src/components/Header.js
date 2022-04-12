import { useDispatch } from 'react-redux';
import { Button } from "primereact/button";

import Form from "./Form";
import { sidebarVisibility } from '../reducers/settings';

const Header = () => {
    const dispatch = useDispatch();

    const showSidebar = () => {
        dispatch(sidebarVisibility(true));
    }

    return (
        <div className="px-3 pb-3 bg-blue-100">
            <div className="flex align-items-center">
                <h1 className="flex-auto border-bottom-2">Status Points Analyser</h1>
                <Button icon="pi pi-cog" className="flex-none ml-4 p-button-rounded p-button-outlined" onClick={showSidebar}/>
            </div>
            <Form />
        </div>
    );
};

export default Header;