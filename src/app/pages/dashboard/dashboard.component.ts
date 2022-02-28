import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { AppLoaderService } from '../../services/common/app-loader/app-loader.service';
import { AppDialogService } from '../../services/common/app-dialog/app-dialog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lat = 29.3333300;
  lng = -110.6666700;
  zoom: number = 7;
  infoWindowOpened = null;
  markers: any;
  estadistica: any;
  arrayYears: number[] = []
  dashboardForm: FormGroup;
  anio = 2021;
  constructor(private spinner: NgxSpinnerService, private AuthService: AuthService, private formBuilder: FormBuilder, private dashboardService: DashboardService, private Router: Router, private dialog: AppDialogService, private loader: AppLoaderService) { }

  ngOnInit(): void {
    this.initForm();
    const yearActually = new Date().getFullYear();

    for (let i = yearActually; i >= 2015; i--) {
      this.arrayYears.push(i);
    }
    // console.log('object :>> ', new Date().getFullYear());
    this.dashboardForm.controls['ANIO'].setValue(new Date().getFullYear());



    var date = new Date();
    // console.log('this.AuthService.getUserRol() :>> ', this.AuthService.getUserRol());
    if (this.AuthService.getUserRol() == 1) {
      this.spinner.show();
      this.dashboardService.obtenerMarkersAdmin(date.getFullYear()).subscribe(markers => {
        this.markers = markers;
      });
      this.dashboardService.obtenerEstDashAdmin(date.getFullYear()).subscribe(x => {
        this.estadistica = x;
        // console.log('x :>> ', x);
        this.spinner.hide()
      });

    } else {
      this.spinner.show();
      this.dashboardService.obtenerMarkersUnidad(date.getFullYear(), this.AuthService.getUserClave()).subscribe(markers => {
        this.markers = markers;
        // console.log('markers :>> ', markers);
      });

      this.dashboardService.obtenerEstDashUnidad(date.getFullYear(), this.AuthService.getUserClave()).subscribe(x => {
        this.estadistica = x;
        // console.log('x :>> ', x);
        this.spinner.hide()
      });
    }

  }
  view(e: any) {
    // console.log('e :>> ', e);
    this.Router.navigate(['/expediente/'+ e.TIPO_REGISTRO + "/" + e.ANIO + "/" + e.CONTROL + "/" + e.CLAVE]);
  }

  initForm() {
    this.dashboardForm = this.formBuilder.group({
      ANIO: [2021],
    });
    this.onChanges();
  }
  marcadorClick(infoWindow) {
    // tslint:disable-next-line:curly
    if (this.infoWindowOpened === infoWindow)
      return;
    // tslint:disable-next-line:curly
    if (this.infoWindowOpened !== null)
      this.infoWindowOpened.close();

    this.infoWindowOpened = infoWindow;
  }

  DataEstadistica(titulo: any, tipo: any) {
    // this.dialog.showComponent(ViewTableDashComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   disableClose: true,
    //   data: {
    //     titulo: titulo,
    //     anio: this.anio,
    //     tipo: tipo
    //   }
    // }
    // ).subscribe(res => {
    //   // console.log('res :>> ', res);

    // });
  }


  onChanges() {
    this.dashboardForm.controls['ANIO'].valueChanges.subscribe(res => {

      // console.log('res :>> ', res);
      this.anio = res;

      if (this.AuthService.getUserRol() == 1) {
        this.dashboardService.obtenerMarkersAdmin(res).subscribe(markers => {
          this.markers = markers;
        });

        this.dashboardService.obtenerEstDashAdmin(res).subscribe(x => {
          this.estadistica = x;
          // console.log('x :>> ', x);
        });
      } else {
        this.dashboardService.obtenerMarkersUnidad(res, this.AuthService.getUserClave()).subscribe(markers => {
          this.markers = markers;
        });
        this.dashboardService.obtenerEstDashUnidad(res, this.AuthService.getUserClave()).subscribe(x => {
          this.estadistica = x;
          // console.log('x :>> ', x);
        });

      }

    });
  }
}
