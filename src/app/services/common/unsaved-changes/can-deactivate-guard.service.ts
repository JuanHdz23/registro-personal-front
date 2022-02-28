import { Injectable, HostListener } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export abstract class ComponentCanDeactivate {

    abstract canDeactivate(): boolean;

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (!this.canDeactivate()) {
            $event.returnValue = true;
        }
    }
}

export abstract class FormCanDeactivate extends ComponentCanDeactivate {
    abstract unsavedData(): boolean;

    canDeactivate(): boolean {
        return !this.unsavedData();
    }
}


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {

    canDeactivate(component: ComponentCanDeactivate): boolean {
        if (!component.canDeactivate()) {
            if (confirm('Usted tiene cambios que no han sido guardados aun. ' +
                '¿Está seguro de que quiere abandonar este formulario y perder los cambios realizados?')) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
