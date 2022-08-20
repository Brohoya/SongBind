import { useContext, createContext } from 'react';
import useSWR, { Fetcher } from 'swr';
import { Platforms } from '../pages/api/connectedPlatforms';

const platformContext = createContext(null);

export default function usePlatforms() {
    return useContext(platformContext);
}

export interface IPlatforms {
    platforms: Platforms,
    isLoading: boolean
}

export function PlatformsProvider(props) {
    const fetcher: Fetcher<Platforms, string> = (...args) => fetch(...args).then(res => res.json());
    const { data, error } = useSWR<Platforms, Error>('/api/connectedPlatforms', fetcher);

    const value = {
        platforms: data,
        isLoading: !error && !data,
        error: error
    }

    return <platformContext.Provider value={value} {...props} />;
}

// const [platforms, setPlatforms] = useState<Platforms>(null);
// const [isLoading, setIsLoading] = useState<boolean>(true);

// useEffect(() => {
//     setIsLoading(true);
//     fetch('/api/connectedPlatforms', {method: 'GET'})
//         .then((res) => res.json())
//         .then((data) => {
//             setPlatforms(data);
//             setIsLoading(false);
//         })
// }, []);