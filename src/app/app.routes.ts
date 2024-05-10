import { Routes } from '@angular/router'

import { PanelComponent } from './components/screens/panel/panel.component'
import { AdminComponent } from './components/screens/admin/admin.component'

export const routes: Routes = [
	{
		path: "",
		component: PanelComponent
	},
	{
		path: "admin",
		component: AdminComponent,
	}
]