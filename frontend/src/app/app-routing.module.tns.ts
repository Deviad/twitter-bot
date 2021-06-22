import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { routes } from '@src/app/app.routes.tns';

@NgModule({
  // forRoot este o functie prin care setam rutele pentru intreaga aplicatie.
  // Acesta istanta de NativeScriptRouterModule este un singleton.

  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
