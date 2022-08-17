import Image from "next/image";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
    const auth = useAuth();
    const router = useRouter();

    if(auth.user) router.push('/dashboard');

    return (
        <main className="main">
            <div  className="w-6/12 flex flex-col space-y-5 ring-2 ring-slate-700 rounded-3xl mx-auto my-20 content-center px-40 py-20">
                <h1 className="text-xl font-bold">Sign up or Login :</h1>
                <div className="flex flex-col space-y-3 w-8/12 mx-auto">
                    <GoogleSignInButton />
                </div>
                <div className="flex flex-col space-y-3 w-8/12 mx-auto">
                    <GithubSignInButton />
                </div>
            </div>
        </main>
    );
};

function GoogleSignInButton() {
    const {loginWithGoogle} = useAuth()

    return (
        <button className='' onClick={() => loginWithGoogle()}>
            <div className="flex flex-row my-auto font-bold ring-4 ring-gray-800 hover:ring-offset-1 transition-all delay-50 ease-linear p-2 rounded-lg justify-center">
                <Image src={'/google.png'} width={'25'} height={'25'} />
                &nbsp; Log in with Google
            </div>
        </button>
    );
};


function GithubSignInButton() {
    return (
        <button className='' onClick={() => {}}>
            <div className="flex flex-row my-auto font-bold ring-4 ring-gray-800 hover:ring-offset-1 transition-all delay-50 ease-linear p-2 rounded-lg justify-center">
                <Image src={'/github.png'} width={'25'} height={'25'} />
                &nbsp; Log in with Github
            </div>
        </button>
    );
};
