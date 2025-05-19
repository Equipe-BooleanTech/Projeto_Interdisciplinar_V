import { useCallback, useEffect, useState } from "react";
import { useDevice } from ".";
import { getToken } from "../services";
import { useRouter } from "expo-router";

const useRedirect = () => {
    const router = useRouter();
    const { isFirstLaunchWeb, isFirstLaunchMobile } = useDevice();
    const isFirstLaunch = isFirstLaunchWeb || isFirstLaunchMobile;
    const { deviceType } = useDevice();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken();
            setIsAuthenticated(token !== null && token !== undefined && token !== '');
        };
        fetchToken();
    }, []);

    const backToLogin = useCallback(() => {
        !isAuthenticated && (deviceType === 'web' ? window.location.href = '/Login' : router.navigate('/Login'));
    }, [deviceType]);

    const goToHome = useCallback(() => {
        isAuthenticated && (deviceType === 'web' ? window.location.href = '/Home' : router.navigate('/Home'));
    }, [isAuthenticated]);
        

    const redirect = useCallback(() => {
        if (isAuthenticated) {
            deviceType === 'web' ? window.location.href = '/Home' : router.navigate('/Home');
        } else {
            deviceType === 'web' ? window.location.href = '/Login' : router.navigate('/Login');
        }
    }
    , [isAuthenticated]);
    
    return {
        backToLogin,
        goToHome,
        redirect,
    };
}

export default useRedirect;