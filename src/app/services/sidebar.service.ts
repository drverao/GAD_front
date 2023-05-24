import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //LISTA DE ITEMS PARA SIDEBAR ADMIN
  menu: any[] = [
    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Asignación",
      submenu: [
        { titulo: 'Asignar Evidencia', url: 'asignaEvidencia', icono: 'fas fa-check-square' }
      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Observación",
      submenu: [
        { titulo: ' Agregar observacion ', url: 'observaciones', icono: 'fas fa-cubes' }
      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-list',
      titulo: "Criterio",
      submenu: [
        { titulo: 'Lista de Criterios', url: 'criterios', icono: 'fas fa-cubes' },
        { titulo: 'Lista de Subcriterios', url: 'subcriterios', icono: 'fas fa-cubes' },
        { titulo: 'Lista de Indicadores', url: 'indicadores', icono: 'fas fa-cubes' },
        { titulo: 'Reporte de Criterios', url: 'criterio_reporte', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-exclamation-circle',
      titulo: "Revisión  ",
      submenu: [
        { titulo: 'Aprobar o rechazar evidencias', url: 'apruebaAdmin', icono: 'fas fa-times-circle' }

      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Actividades Rechazadas",
      submenu: [
        { titulo: 'Lista Notificar', url: 'actividad-rechazada', icono: 'fas fa-cubes' }

      ]
    },
  ]

  //LISTA DE ITEMS PARA SIDEBAR SUPERADMIN
  menu2: any[] = [
    {
      icono: 'nav-icon fas   fa-newspaper',
      titulo: "Dashboard",
      submenu: [
        { titulo: 'Actividades', url: 'dashboard', icono: 'fas fa-list-ul ' }

      ]
    },
    {
      icono: 'nav-icon fas   fa-users',
      titulo: "Usuarios",
      submenu: [
        { titulo: 'Lista de Usuarios', url: 'usuarios', icono: 'fas fa-list-ul ' }

      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-check-square',
      titulo: "Observación",
      submenu: [
        { titulo: ' Agregar observacion ', url: 'observaciones', icono: 'fas fa-cubes' }

      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-list',
      titulo: "Criterio",
      submenu: [
        { titulo: 'Lista de Criterios', url: 'criterioSuper', icono: 'fas fa-cubes' },
        { titulo: 'Lista de Subcriterios', url: 'subcriterioSuper', icono: 'fas fa-cubes' },
        { titulo: 'Lista de Indicadores', url: 'indicadoreSuper', icono: 'fas fa-cubes' }
,
        { titulo: 'Reporte de Criterios', url: 'criterio_reporte', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Evaluación",
      submenu: [
        { titulo: 'Evaluación de Actividades', url: 'evidenciaSuper', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-cube',
      titulo: "Modelo",
      submenu: [
        { titulo: 'Modelos', url: 'modelo', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-tachometer-alt',
      titulo: "Formulas",
      submenu: [
        { titulo: 'Lista de Formulas', url: 'formula', icono: 'fas fa-cubes' },
        { titulo: 'Lista Cuantitativas', url: 'cuantitativa', icono: 'fas fa-cubes' },
        { titulo: 'Lista Cualitativas', url: 'cualitativa', icono: 'fas fa-cubes' },

      ]
    },
    {
      icono: 'nav-icon fas fa-exclamation-circle',
      titulo: "Revisión  ",
      submenu: [
        { titulo: 'Aprobar o rechazar evidencias', url: 'apruebaAdmin', icono: 'fas fa-times-circle' }

      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Actividades Rechazadas",
      submenu: [
        { titulo: 'Lista Notificar', url: 'actividad-rechazada', icono: 'fas fa-cubes' }

      ]
    },

  ]


  //LISTA DE ITEMS PARA SIDEBAR RESPONSABLE
  menu3: any[] = [
    {
      icono: 'nav-icon fas fa-tasks',
      titulo: "Evidencias",
      submenu: [
        { titulo: 'Evidencias asignadas', url: 'eviTareaAsina', icono: 'fas fa-file-contract' }

      ]
    },
    {
      icono: 'nav-icon fas fa-tasks',
      titulo: "Criterios",
      submenu: [
        { titulo: 'Reporte Criterios', url: 'actividadCriterio', icono: 'fas fa-file-contract' }

      ]
    }

  ]

  //LISTA DE ITEMS PARA SIDEBAR AUTORIDAD
  menu4: any[] = [
    {
      icono: 'nav-icon fas fa-solid fa-running',
      titulo: "Avance",
      submenu: [
        { titulo: 'Actividades Completadas', url: 'consulta', icono: 'fas fa-cubes' }
      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-list',
      titulo: "Acividades",
      submenu: [
        { titulo: 'Actividades registradas', url: 'actividad_auto', icono: 'fas fa-cubes' }

      ]
    }
  ,

    {
      icono: 'nav-icon fas fa-solid fa-cube',
      titulo: "Reportes",
      submenu: [
        { titulo: 'Lista de Modelos', url: 'graficosAutor', icono: 'fas fa-cubes' },
        { titulo: 'Reporte de Criterios', url: 'criterio_reporte', icono: 'fas fa-cubes' }
      ]
    }
  ]
}
