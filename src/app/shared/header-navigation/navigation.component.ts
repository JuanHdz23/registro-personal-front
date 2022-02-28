import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
    userName: any ;
    userRol: any;
  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  fotoUser: any;

  constructor(private modalService: NgbModal, private AuthService:AuthService, private UsuariosService:UsuariosService) {
  this.userName =this.AuthService.getUserNombre();
  this.userRol = this.AuthService.getUserNombreRol();
  
  // this.UsuariosService.getFoto(this.AuthService.getUserId()).subscribe(res =>{
  //   this.fotoUser =  environment.API_URL_FOTO+res
  // });

  }

  logout(){
    this.AuthService.logout();
  }

  ngAfterViewInit() {}
}
