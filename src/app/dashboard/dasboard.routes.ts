import { Routes } from '@angular/router';
import { StatisticsComponent } from '../income-expense/statistics/statistics.component';
import { IncomeExpenseComponent } from '../income-expense/income-expense.component';
import { DetailsComponent } from '../income-expense/details/details.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent},
    { path: 'income-expense', component: IncomeExpenseComponent},
    { path: 'details', component: DetailsComponent},
    { path: '**', redirectTo: ''}

]