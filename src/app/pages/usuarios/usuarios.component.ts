import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
  import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { AppDialogService } from 'src/app/services/common/app-dialog/app-dialog.service';
import { FormCanDeactivate } from 'src/app/services/common/unsaved-changes/can-deactivate-guard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { AppLoaderService } from 'src/app/services/common/app-loader/app-loader.service';
import Swal from 'sweetalert2';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero, form', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class UsuariosComponent  implements OnInit {

  dialogHeader: string = "Usuarios";
  usuariosDisplayedColumns: string[] = ['Nombre', 'ApellidoPaterno', 'ApellidoMaterno', 'Usuario1', 'Activo','acciones'];
  usuariosDataSource: any;
  usuarios: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  constructor(
    private dialog: AppDialogService,
    private usuariosService: UsuariosService,
    private loader: AppLoaderService,
    private permissionsService: NgxPermissionsService

  ) {}


  ngOnInit() {
    this.renderDataTable();
  }


  cambiarEstatus(element: any, activado: boolean) {

    // this.loader.open('Actualizando');
    // this.usuariosService.activarUsuarios(id, !activado).subscribe(res => {
    //   setTimeout(() => {
    //     this.loader.close();
    //   }, 200);
    // }, err => {
    //   setTimeout(() => {
    //     this.loader.close();
    //   }, 200);
    // });


    if (activado) {
      Swal.fire({
        title: 'Estas Seguro?',
        text: "El usuario " + element.Usuario1 + " se desactivara",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Desactivar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader.open('Actualizando');
          this.usuariosService.activarUsuarios(element.Id, !activado).subscribe(res => {
            setTimeout(() => {
              Swal.fire(
                'Desactivado!',
                'El usuario se ha descactivado correctamente',
                'success'
              )
              this.renderDataTable();
              this.loader.close();
            }, 200);
          }, err => {
            setTimeout(() => {
              this.loader.close();
            }, 200);
          });
        } else {
          this.renderDataTable();
        }
      })
    }else{
          Swal.fire({
      title: 'Estas Seguro?',
      text: "El usuario "+ element.Usuario1 +" se activara",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Activar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.open('Actualizando');
        this.usuariosService.activarUsuarios(element.Id, !activado).subscribe(res => {
  setTimeout(() => {
    Swal.fire(
      'Activado!',
      'El usuario se ha activado correctamente',
      'success'
    )
    this.renderDataTable();
    this.loader.close();
  }, 200);
}, err => {
  setTimeout(() => {
    this.loader.close();
  }, 200);
});
      }
      else{
        this.renderDataTable()
      }
    })
    }





  }

  renderDataTable() {
    this.usuariosService.obtenerUsuarios().subscribe(res => {
      const data: any = res;
      this.usuariosDataSource = new MatTableDataSource();
      this.usuariosDataSource.data = data;
      this.usuariosDataSource.sort = this.sort;
      this.usuariosDataSource.paginator = this.paginator;
    }, err => {
      console.log(err.message);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.usuariosDataSource.filter = filterValue;
  }

  registrarUsuario(element?) {
    if (this.usuariosDataSource) {
      var usuario = element
    }
    this.dialog.showComponent(RegistroUsuarioComponent, {
      width: '80%',
      height: '70%',
      disableClose: true,
      data: {
        usuario: usuario
      }
    }).subscribe(res => {
      this.renderDataTable();
      if (res) {
        console.log(res);
      }
    });
  }

  eliminarUsuario(id) {
    this.dialog.confirmRemove().subscribe(res => {
      if (res) {
        this.usuariosService.eliminarUsuario(id).subscribe((res: any) => {
          this.renderDataTable();
        });
      }
    });
  }


}
