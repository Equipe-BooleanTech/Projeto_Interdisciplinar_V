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

    const checkAuthentication = useCallback(async () => {
        const token = await getToken();
        setIsAuthenticated(!!token);
        return !!token;
    }, []);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    const backToLogin = useCallback(() => {
        router.replace('/Login');
    }, [router]);

    const goToHome = useCallback(async () => {
        const isAuth = await checkAuthentication();
        if (isAuth) {
            router.replace('/Home');
        }
    }, [checkAuthentication, router]);
        
    const redirect = useCallback(async () => {
        const isAuth = await checkAuthentication();
        if (isAuth) {
            router.replace('/Home');
        } else {
            router.replace('/Login');
        }
    }, [checkAuthentication, router]);
    
    return {
        backToLogin,
        goToHome,
        redirect,
        checkAuthentication,
        isAuthenticated
    };
};

export default useRedirect;