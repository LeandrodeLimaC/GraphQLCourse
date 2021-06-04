module.exports = {
    indiceUsuario(filtro) {
        if (!filtro) return -1

        const { id, email } = filtro

        if (id) return usuarios.findIndex(usuario => usuario.id === id)
        if (email) return usuarios.findIndex(usuario => usuario.email === email)

        return -1
    }
}