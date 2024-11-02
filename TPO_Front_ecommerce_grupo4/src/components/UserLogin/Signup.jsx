
const Signup = () => {
    return(
        <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nombre de usuario" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Correo electrónico" />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Contraseña" />
              </div>
              <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
    )
}

export default Signup;