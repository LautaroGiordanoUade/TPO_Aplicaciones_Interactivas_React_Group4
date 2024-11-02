
const Reset = () => {
    return(
    <form>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Correo electrónico" />
        </div>
        <button type="submit" className="btn btn-warning w-100">Restablecer Contraseña</button>
    </form>
    )
}

export default Reset;