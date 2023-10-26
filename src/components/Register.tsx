import {FormEvent, useState} from "react";
import CharbonLogo from "../assets/charbon.png"
interface RegisterProps{
    register: (username: string) => Promise<void>
}
export function Register({register}: RegisterProps){

    const [username, setUsername] = useState<string>('')
    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        await register(username)
    }

    return <>
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-12 h-12 mr-2" src={CharbonLogo} alt="logo"/>
                        Charbon
                </a>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Se connecter
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Nom d'utilisateur</label>
                                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true}/>
                            </div>
                            <div className="flex w-full justify-center">
                                <button type="submit" className="text-gray-900 border bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Se Connecter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}