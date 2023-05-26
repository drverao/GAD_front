import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //LISTA DE ITEMS PARA SIDEBAR ADMIN
  menu: any[] = [
    {
      icono: 'nav-icon fas fa-users',
      titulo: "Asignación",
      submenu: [
        { titulo: 'Asignar Evidencia', url: 'asignaEvidencia', icono: 'fas fa-check-square' }
      ]
    },
    {
      icono: 'nav-icon fas fa-eye',
      titulo: "Observación",
      submenu: [
        { titulo: ' Agregar observación ', url: 'observaciones', icono: 'fas fa-cubes' }
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
      icono: 'nav-icon fas fa-ban',
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
        { titulo: ' Agregar observación ', url: 'observaciones', icono: 'fas fa-cubes' }

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
      icono: 'nav-icon fas fas fa-star',
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
      icono: 'nav-icon fas fa-superscript',
      titulo: "Fórmula",
      submenu: [
        { titulo: 'Lista de Fórmula', url: 'formula', icono: 'fas fa-cubes' },
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
      icono: 'nav-icon fas fas fa-ban',
      titulo: "Actividades Rechazadas",
      submenu: [
        { titulo: 'Lista Notificar', url: 'actividad-rechazada', icono: 'fas fa-cubes' }

      ]
    },

  ]


  //LISTA DE ITEMS PARA SIDEBAR RESPONSABLE
  menu3: any[] = [
    {
      icono: 'nav-icon fas fa-file-alt',
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
      titulo: "Actividades",
      submenu: [
        { titulo: 'Actividades Completadas', url: 'consulta', icono: 'fas fa-cubes' }
      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-list',
      titulo: "Responsable",
      submenu: [
        { titulo: 'Lista de Responsable', url: 'actividad_auto', icono: 'fas fa-cubes' }

      ]
    }
  ,

    {
      icono: 'nav-icon fas fa-file-pdf',
      titulo: "Reportes",
      submenu: [
        { titulo: 'Lista de Modelos', url: 'graficosAutor', icono: 'fas fa-cubes' },
        { titulo: 'Reporte de Criterios', url: 'criterio_reporte', icono: 'fas fa-cubes' }
      ]
    }
  ]
}
