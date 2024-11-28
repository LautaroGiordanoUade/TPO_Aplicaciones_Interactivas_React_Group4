import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { eventEmitter } from "../components/utils/eventEmitter";


const useConnection = () => {
  const { logout } = useAuth();


  useEffect(() => {
    const handleTokenExpired = async () => {
        logout("tokenExpired");
      
    };

    // Escuchar el evento de expiración del token
    eventEmitter.on('tokenExpired', handleTokenExpired);

    // Limpieza: elimina el listener cuando el componente se desmonta
    return () => {
      eventEmitter.off('tokenExpired', handleTokenExpired);
    };
  }, [logout]);


  return (
    <>  </>
  );
};

export default useConnection;