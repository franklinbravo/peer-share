import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatToolbarModule, MatButtonModule,MatSelectModule, MatSidenavModule,MatInputModule, MatIconModule, MatListModule } from '@angular/material';
@NgModule({
  imports: [MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule],
  exports: [MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule],
})
export class MaterialModules { }