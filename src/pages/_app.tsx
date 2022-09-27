import '../styles/global.css';
import '../lib/Firebase.config';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import AppLayout from '../components/AppLayout';
import AuthStateChanged from '../components/AuthStateChanged';
import Header from '../components/Header';


export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <AuthProvider>
            <Header />
            <AppLayout>
                <AuthStateChanged>
                    <Component {...pageProps} />
                </AuthStateChanged>
            </AppLayout>
        </AuthProvider>
    );
}
