import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  // {
  //   path: '/dashboard',
  //   title: 'Inicio',
  //   icon: 'mdi mdi-gauge',
  //   class: '',
  //   extralink: false,
  //   submenu: [],
  //   rol: ["1", "2","3", "4","5", "6","7", "8"]
  // },
  {
    path: '/expediente',
    title: 'Expedientes',
    icon: 'mdi mdi-book',
    class: '',
    extralink: false,
    submenu: [
      // {
      //   path: '/expediente',
      //   title: 'Control De Expediente',
      //   icon: 'mdi mdi-book',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      //   rol: ["1","2","3", "4","5", "6","7", "8", "9"]
      // },
    	// {
      //   path: '/consulta-avanzada',
      //   title: 'Consulta Avanzada',
      //   icon: 'fa fa-search',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      //   rol: ["1"]
      // },
      // {
      //   path: '/tablero-expediente',
      //   title: 'Tablero Estadístico',
      //   icon: 'mdi mdi-chart-arc',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      //   rol: ["1"]
      // }
    ],
    rol: ["1", "2","3", "4","5", "6","7", "8", "9"]
  },
  {
    path: '/usuarios',
    title: 'Usuarios',
    icon: 'mdi mdi-account',
    class: '',
    extralink: false,
    submenu: [],
    rol: ["1"]
  },
  // {
  //   path: '/graficas',
  //   title: 'Tablero Estadístico',
  //   icon: 'mdi mdi-chart-arc',
  //   class: '',
  //   extralink: false,
  //   submenu: [],
  //   rol: ["1"]
  // },
  {
    path: '/reportes',
    title: 'Reportes',
    icon: 'mdi mdi-file-chart',
    class: '',
    extralink: false,
    submenu: [],
    rol: ["1"]
  }
];
