import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //LISTA DE ITEMS PARA SIDEBAR ADMIN
  menu: any[] = [
    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Criterios",
      submenu: [
        { titulo: 'Lista de Criterios', url: 'criterios', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Subcriterios",
      submenu: [
        { titulo: 'Lista de Subcriterios', url: 'subcriterios', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Indicadores",
      submenu: [
        { titulo: 'Lista de Indicadores', url: 'indicadores', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Evaluacion",
      submenu: [
        { titulo: 'Evalucion de Actividades', url: 'evaluacion', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-exclamation-circle',
      titulo: "Revisión  ",
      submenu: [
        { titulo: 'Aprobar o rechazar evidencias', url: 'apruebaAdmin', icono: 'fas fa-times-circle' }

      ]
    },
  ]

  //LISTA DE ITEMS PARA SIDEBAR SUPERADMIN
  menu2: any[] = [
    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Usuarios",
      submenu: [
        { titulo: 'Lista de Usuarios', url: 'usuarios', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Criterios",
      submenu: [
        { titulo: 'Lista de Criterios', url: 'criterioSuper', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Subcriterios",
      submenu: [
        { titulo: 'Lista de Subcriterios', url: 'subcriterioSuper', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Indicadores",
      submenu: [
        { titulo: 'Lista de Indicadores', url: 'indicadoreSuper', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Evaluacion",
      submenu: [
        { titulo: 'Evalucion de Actividades', url: 'evidenciaSuper', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Modelo",
      submenu: [
        { titulo: 'Modelos', url: 'modelo', icono: 'fas fa-cubes' }

      ]
    }
  ]

  //LISTA DE ITEMS PARA SIDEBAR RESPONSABLE
  menu3: any[] = [
    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Actividades",
      submenu: [
        { titulo: 'Lista de Actividades', url: 'actividad', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Evidencia",
      submenu: [
        { titulo: 'Lista de Evidencias', url: 'evidenciaResponsable', icono: 'fas fa-cubes' }

      ]
    }
  ]

  //LISTA DE ITEMS PARA SIDEBAR AUTORIDAD
  menu4: any[] = [
    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Consulta",
      submenu: [
        { titulo: 'Lista de Consulta', url: 'consulta', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Reporte",
      submenu: [
        { titulo: 'Lista de Evidencias', url: 'reporte', icono: 'fas fa-cubes' }

      ]
    }
  ]
}
