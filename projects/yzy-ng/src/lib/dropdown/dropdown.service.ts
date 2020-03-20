import { Subject, identity } from 'rxjs';
import { OptionModel } from './models/OptionModel';
import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { DropdownOptionState } from './models/DropdownOptionState';
import { DropdownOptionsComponent } from './dropdown-options/dropdown-options.component';

@Injectable({ providedIn: 'root'})
export class DropdownService {

    optionsState$ = new Subject<DropdownOptionState>();
    private lastId = 0;
    private optionsReferences: { [key: number] : ComponentRef<DropdownOptionsComponent> } = {};

    constructor(
        private appRef: ApplicationRef,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver
        ) { }

    displayOptions(options: OptionModel[], bottomLeftPosition: { x: number, y: number }, width: number): number{
        const id = ++this.lastId;
        setTimeout(()=> {
            this.createOptionsComponent(id, options,bottomLeftPosition, width);
            this.optionsState$.next({ id, selectedOption: null, isOpen: true });
        });
        return id;
    }

    close(id: number, option: OptionModel = null): void {
        this.optionsState$.next({ id, selectedOption: option, isOpen: false });
        this.destroyOptionsComponent(id);
    }

    private createOptionsComponent(id: number, options: OptionModel[], bottomLeftPosition: { x: number, y: number }, width: number): void{

        const optionsRef = this.componentFactoryResolver
            .resolveComponentFactory(DropdownOptionsComponent)
            .create(this.injector);
        optionsRef.instance.id = id;
        optionsRef.instance.displayedOptions = options;
        optionsRef.instance.dropdownService = this;
         optionsRef.instance.x = bottomLeftPosition.x - 1;
        optionsRef.instance.y = bottomLeftPosition.y - 1;
        optionsRef.instance.width = width + 2;
        this.appRef.attachView(optionsRef.hostView);

        const domElem = (optionsRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);
        this.optionsReferences[id] =  optionsRef;
    }

    private destroyOptionsComponent(id: number): void{
        if(this.optionsReferences[id] !== undefined){
            this.appRef.detachView(this.optionsReferences[id].hostView);
            this.optionsReferences[id].destroy();
            this.optionsReferences[id] = undefined;
        }
    }
}
