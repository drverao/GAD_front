import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //LISTA DE ITEMS PARA SIDEBAR ADMIN
  menu: any[] = [
    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Asignacion",
      submenu: [
        { titulo: 'Lista de Asignación de Admin', url: 'asigna', icono: 'fas fa-cubes' },
        { titulo: 'Lista de Asignación de Evidencia', url: 'asignaEvidencia', icono: 'fas fa-cubes' }

      ]
    },
    {
      icono: 'nav-icon fas fa-list',
      titulo: "Criterios",
      submenu: [
        { titulo: 'Lista de Criterios', url: 'criterios', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Subcriterios",
      submenu: [
        { titulo: 'Lista de Subcriterios', url: 'subcriterios', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Indicadores",
      submenu: [
        { titulo: 'Lista de Indicadores', url: 'indicadores', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-plus',
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
      icono: 'nav-icon fas   fa-users',
      titulo: "Usuarios",
      submenu: [
        { titulo: 'Lista de Usuarios', url: 'usuarios', icono: 'fas fa-list-ul ' }

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
      titulo: "Criterios",
      submenu: [
        { titulo: 'Lista de Criterios', url: 'criterioSuper', icono: 'fas fa-cubes' },
        { titulo: 'Reporte de Criterios', url: 'criterio_reporte', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-list',
      titulo: "Subcriterios",
      submenu: [
        { titulo: 'Lista de Subcriterios', url: 'subcriterioSuper', icono: 'fas fa-cubes' }

      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-list',
      titulo: "Indicadores",
      submenu: [
        { titulo: 'Lista de Indicadores', url: 'indicadoreSuper', icono: 'fas fa-cubes' }

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
      icono: 'nav-icon fas fa-solid fa-plus',
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
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Buscar Docente",
      submenu: [
        { titulo: 'Buscar', url: 'buscar', icono: 'fas fa-cubes' }

      ]
    }
  ]


  //LISTA DE ITEMS PARA SIDEBAR RESPONSABLE
  menu3: any[] = [
    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Actividades",
      submenu: [
        { titulo: 'Lista de Actividades', url: 'ActividadesResponsable', icono: 'fas fa-cubes' }
      ]
    },

    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Evidencia",
      submenu: [
        { titulo: 'Lista de Evidencias', url: 'evidenciaResponsable', icono: 'fas fa-cubes' }

      ]
    },
    {
      icono: 'nav-icon fas fa-tasks',
      titulo: "Evidencias",
      submenu: [
        { titulo: 'Evidencias asignadas', url: 'eviTareaAsina', icono: 'fas fa-file-contract' }

      ]
    }
  ]

  //LISTA DE ITEMS PARA SIDEBAR AUTORIDAD
  menu4: any[] = [
    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Consulta",
      submenu: [
        { titulo: 'Lista de Consulta', url: 'consulta', icono: 'fas fa-cubes' }
      ]
    },
    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Acividades",
      submenu: [
        { titulo: 'Actividades registrdas', url: 'actividad_auto', icono: 'fas fa-cubes' }

      ]
    }
  ,

    {
      icono: 'nav-icon fas fa-solid fa-plus',
      titulo: "Reporte",
      submenu: [
        { titulo: 'Lista de Evidencias', url: 'reporte', icono: 'fas fa-cubes' }

      ]
    }
  ]
}
