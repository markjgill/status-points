import { Button } from "primereact/button";

import Form from "./Form";

const Header = () => (
    <div className="px-3 pb-3 bg-blue-100">
        <div className="flex align-items-center">
            <h1 className="flex-auto border-bottom-2">Status Points Analyser</h1>
            <Button icon="pi pi-cog" className="flex-none ml-4 p-button-rounded p-button-outlined" />
        </div>
        <Form />
    </div>
);

export default Header;