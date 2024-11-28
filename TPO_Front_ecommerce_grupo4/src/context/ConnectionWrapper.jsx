import useConnection from '../hooks/useConnection';

const ConnectionWrapper = ({ children }) => {
  // Llama a tu hook que valida la conexión o el token
  useConnection();

  return <>{children}</>;
};

export default ConnectionWrapper;