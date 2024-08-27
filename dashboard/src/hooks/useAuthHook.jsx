import { useSelector } from 'react-redux';

const useAuthHook = () => {

    const { profile } = useSelector((state) => state.admin);

    return { profile };
}

export default useAuthHook;
