
const Login = ({setView}) => {
    return(
        <form>
            <div className="mb-3">
            <input type="email" className="form-control" placeholder="Correo electrónico" />
            </div>
            <div className="mb-3">
            <input type="password" className="form-control" placeholder="Contraseña" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            <div className="mt-3">
            <a href="#!" onClick={() => setView('reset')}>¿Olvidaste tu contraseña?</a>
            </div>
        </form>
    )
}

export default Login;