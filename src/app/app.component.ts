import { DataService } from 'src/app/service/data.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
  imports: [
    HttpClientModule,
    ToolbarModule,
    TreeTableModule,
    DropdownModule,
    GalleriaModule,
    ButtonModule,
    RouterOutlet,
    HeaderComponent,
    FormsModule,
    DividerModule,
    DialogModule,
    GalleriaModule,
    ToastModule,
    TableModule,
    InputTextModule,
  ],
})
export class AppComponent {
  dataService: DataService = inject(DataService);
  currentRow: any;
  value!: any;
  // 讓使用header的人自己決定要不要使用search bar功能（isSearchDisabled）
  isSearchDisabled: boolean = false;

  ngOnInit(): void {
    this.value= this.dataService.getData(); //透過dataService的getData()方法，將資料撈進來header.component
  }

  onSearch(text: string) {
    this.value= this.dataService.search(text);

  }

  onRowSelect(currentRow: any) {
    this.currentRow = currentRow;
  }

}
