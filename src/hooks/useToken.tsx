import { useStorage } from '.';

const useToken = () => {
  const { getItem, removeItem, setItem } = useStorage();

  const getToken = async () => {
    const token = await getItem('token');
    return token;
  };

  const setToken = async (token: string) => {
    await setItem('token', token);
  };

  const removeToken = async () => {
    await removeItem('token');
  };
  return {
    getToken,
    setToken,
    removeToken,
  };
};

export default useToken;
