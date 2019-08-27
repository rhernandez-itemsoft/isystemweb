import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
            { path: 'dashboard', loadChildren: () => import('../demo/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('../demo/charts/charts.module').then(m => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('../demo/tables/tables.module').then(m => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('../demo/form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('../demo/bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'grid', loadChildren: () => import('../demo/grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('../demo/bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('../demo/blank-page/blank-page.module').then(m => m.BlankPageModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
