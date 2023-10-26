import {useCallback, useContext, useEffect, useState} from "react";
import {EnvironmentContext} from "../environment/environment.context.ts";
import {User} from "../types/types.ts";

export function useUser(){
    const [user, setUser] = useState<User>()
    const { apiUrl } = useContext(EnvironmentContext);

    useEffect(() => {
        const serializedUser = sessionStorage.getItem('user')
        if(!serializedUser){
            return;
        }
        setUser(<User>JSON.parse(serializedUser));

    }, []);

    const register = useCallback(async (username: string)=> {
        const response = await fetch(`${apiUrl}/user`, {method: 'POST', body: JSON.stringify({username}), headers: {
            'Content-Type': 'application/json'}})
        if(response.ok) {
            const user = await response.json()
            setUser(user)
            sessionStorage.setItem('user', JSON.stringify(user))
        }
    }, [apiUrl])

    return {
        user,
        register
    }
}