const FooterLogin = ({view, setView}) => {
    return(
        <>
        {view === 'login' ? (
              <button className="btn btn-link" onClick={() => setView('signup')}>Crear una nueva cuenta</button>
            ) : (
              <button className="btn btn-link" onClick={() => setView('login')}>Volver al inicio de sesión</button>
            )}
        </>
    )
}

export default FooterLogin;