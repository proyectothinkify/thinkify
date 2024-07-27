export const breadCrumbSwitcher =(text) => {
    switch (text) {
        case 'miperfil':
            return 'Mi Perfil'
        case 'notificaciones':
            return 'Notificaciones'
        case 'miscursos':
            return 'Mis Cursos'
        case 'misobjetivos':
            return 'Mis Objetivos'
        case 'crearcurso':
            return 'Crear Curso'
        default:
            return
    }
}