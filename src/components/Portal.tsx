import {Register} from "./Register.tsx";
import {Home} from "./Home.tsx";
import {useUser} from "../hooks/useUser.ts";

export function Portal(){
    const {user, register} = useUser();

    return <> { !user ? (
        <Register register={register}/>
    ) : (
        <Home user={user}/>
    )}</>
}