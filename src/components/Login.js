import { useDispatch } from 'react-redux';
import { Button } from "primereact/button";

import { setIdToken } from "../reducers/authentication";

const Login = () => {
    const dispatch = useDispatch();

    window.googleSignIn = response => {
        dispatch(setIdToken(response.credential));
    };

    const guestSignIn = () => {
        dispatch(setIdToken(null));
    };

    return (
        <>
            <div id="g_id_onload"
                 data-client_id="678836317280-hdj7pv479p7t1gten1phq9vh61058bup.apps.googleusercontent.com"
                 data-context="signin"
                 data-ux_mode="popup"
                 data-callback="googleSignIn"
                 data-auto_select="true"
                 data-itp_support="true">
            </div>
            <div className="text-center">
                <h1 className="text-7xl mb-3">Status Points Analyser</h1>
                <h2>Track your Air NZ Status Points</h2>
                <h3 className="mt-6">Log in with one of the following:</h3>
                <div className="flex justify-content-center">
                    <div className="g_id_signin"
                        data-type="standard"
                        data-shape="pill"
                        data-theme="filled_blue"
                        data-text="signin_with"
                        data-size="medium"
                        data-logo_alignment="left"
                        data-width="250">
                    </div>
                </div>
                <h3 className="mt-6">Or continue as a guest:</h3>
                <Button className="p-button-rounded p-button-success w-21rem" label="Sign in as Guest" onClick={guestSignIn}/>
            </div>
        </>
    );
};

export default Login;