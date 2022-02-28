import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ElementoSearchPipe,BuscadorGeneralSearchPipe} from './search/buscadorGeneral.pipe'
import { TruncatePipe } from './truncate.pipe';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [

      ElementoSearchPipe,
      BuscadorGeneralSearchPipe,
      TruncatePipe

    ],
    exports: [

      ElementoSearchPipe,
      BuscadorGeneralSearchPipe,
      TruncatePipe

    ]
})
export class PipesModule { }
