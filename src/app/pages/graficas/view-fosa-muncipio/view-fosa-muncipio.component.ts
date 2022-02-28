import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDialogService } from 'src/app/services/common/app-dialog/app-dialog.service';
// import { GraficasService } from '../../../services/graficas/graficas.service';
// import { ViewFosasComponent } from '../../fosas/view-fosas/view-fosas.component';

@Component({
  selector: 'app-view-fosa-muncipio',
  templateUrl: './view-fosa-muncipio.component.html',
  styleUrls: ['./view-fosa-muncipio.component.css']
})
export class ViewFosaMuncipioComponent implements OnInit {
   infoMunicipioFosas: any;

   lat = 29.3333300;
   lng = -110.6666700;
   zoom: number = 5;
   infoWindowOpened = null;
  constructor(
    @Optional() public dialogRef: MatDialogRef<ViewFosaMuncipioComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    // private graficasServices: GraficasService,
    private dialog: AppDialogService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    // this.graficasServices.getInfoFosasMunicipioRangoFechas(this.data.fechaInicial,this.data.fechaFinal,this.data.municipio).subscribe(res =>{
    //   console.log('res :>> ', res);
    //   this.infoMunicipioFosas = res;
    // })
  }

  viewFosa(data?:any){
    console.log('data :>> ', data);
    // this.dialog.showComponent(ViewFosasComponent, {
    //   width: '80%',
    //   height: '80%',
    //   disableClose: true,
    //   data: {
    //     data: data
    //   }
    // }).subscribe(res => {
     
    // });
  }

}
