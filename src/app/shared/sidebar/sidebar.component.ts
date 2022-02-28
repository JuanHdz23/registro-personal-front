import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  userName: any;
  public sidebarnavItems: any[] = [];
  fotoUser: any;
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }

  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private UsuariosService: UsuariosService
  ) { }

  logout() {
    this.AuthService.logout();
  }
  // End open close ==this.AuthService.getUserRol()

  permiso: any;
  tienePermiso(arrayRol:any, permiso: any){
  //  return rol = permiso;
    const filterMenu = query => {
      return arrayRol.filter((rol) => {
        rol = permiso
      })
    };
  }
  
  menuNivelUno: RouteInfo[] = [];
  menu: any;
  ngOnInit() {

  //  const menu = ROUTES.slice();
  //  const result = [];

  //  menu.forEach((x:any) => {
  //    x.rol.forEach(rol =>{
  //     if (rol == this.AuthService.getUserRol()) {
  //       result.push(x);
  //     }
  //    })
  //  })

  //  console.log(result);

  //  console.log('this.menuNivelUno :>> ',  this.menuNivelUno);

  //  result.forEach(j => {
  //   j.submenu = [];
  //   console.log('element :>> ', j);
  //  });

    const menu = ROUTES;
    //  this.sidebarnavItems = ROUTES.filter(sidebarnavItem => {
    //    sidebarnavItem.submenu.filter(x => x.)
    //  });
    for (let i = 0; i < menu.length; i++) {
      const ruta = menu[i];
      // for (let j = 0; j < ruta.rol.length; j++) {
      //   const rutaMenu = ruta.rol[j];
      //   // console.log(rutaMenu);
      //   if( rutaMenu == this.AuthService.getUserRol() ){
      //     this.sidebarnavItems.push(ruta);
      //   }
      // }
      ruta.rol.forEach(rolMenu => {

        if( rolMenu == '1' ){

          const submenu = [];

          if( ruta.submenu.length > 0 ){
            for (let j = 0; j < ruta.submenu.length; j++) {
              const subruta = ruta.submenu[j];
              if( subruta ){
                subruta.rol.forEach(rolSubmenu => {
                  if ( rolSubmenu == this.AuthService.getUserRol() ) {
                    // this.sidebarnavItems.push(subruta);
                    submenu.push(subruta);
                  }
                });
              }
            }
          }

          const rutaMenu: RouteInfo = {
            path: ruta.path,
            title: ruta.title,
            icon: ruta.icon,
            class: ruta.class,
            extralink: ruta.extralink,
            label: ruta.label,
            labelClass: ruta.labelClass,
            rol: ruta.rol,
            submenu
          };
          
          this.sidebarnavItems.push(rutaMenu);
        }
      });
      // if( ruta.submenu.length > 0 ){
      //   console.log('Entre ruta.submenu');
      //   for (let j = 0; j < ruta.submenu.length; j++) {
      //     const subruta = ruta.submenu[j];
      //     console.log(subruta);
      //     if( subruta ){
      //       subruta.rol.forEach(rolSubmenu => {
      //         if ( rolSubmenu == this.AuthService.getUserRol() ) {
      //           console.log('Entre rolSUbmentu');
      //           this.sidebarnavItems.push(subruta);
      //         }
      //       });
      //     }
      //   }
      // }


    }

    // //  const filtroMenu = menu.filter(menu=> {
    // //    console.log('menu :>> ', menu);
    // //    console.log(this.tienePermiso(menu.rol, this.AuthService.getUserRol()));
    // //  })
    // // console.log('filtromenu :>> ', filtroMenu);
    // // const primerFiltrado = menu.filter(x =>{

    // // })
    // // menu.map(menu => {
    // //   menu.rol.forEach(x => {

    // //     if (menu.submenu.length > 0) {
    // //       menu.submenu.forEach(submenu =>{
    // //        submenu.rol.forEach(rolsubmenu=>{
    // //         if (rolsubmenu == this.AuthService.getUserRol()) {
    // //        console.log('object :>> ', submenu);
    // //        this.sidebarnavItems.push(menu);
    // //         }
    // //        })
    // //       })
    // //       // console.log('menu.submenu :>> ', menu.submenu);
    // //       // if (x == this.AuthService.getUserRol()) {
    // //       //   console.log('menu :>> ', menu);
    // //       //   this.sidebarnavItems.push(menu);
    // //       // }
    // //     } else {
    // //       if (x == this.AuthService.getUserRol()) {
    // //         this.sidebarnavItems.push(menu);
    // //       }

    // //     }

    // //   });
    // // })
    this.userName = this.AuthService.getUserNombre();

    // this.UsuariosService.getFoto(this.AuthService.getUserId()).subscribe(res => {
    //   this.fotoUser = environment.API_URL_FOTO + res
    // });
  }
}
