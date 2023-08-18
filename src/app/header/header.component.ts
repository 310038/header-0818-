// 8/17 22:30
import { ButtonModule } from 'primeng/button';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  signal,
} from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import * as jsyaml from 'js-yaml';
import { TimesIcon } from 'primeng/icons/times';

@Component({
  selector: 'his-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    InputMaskModule,
    DividerModule,
    DialogModule,
    GalleriaModule,
    ToastModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ToolbarModule,
    FormsModule,
    TimesIcon,
  ],
})
export class HeaderComponent implements OnInit {
  //接收由其他component灌進來的資料(value)
  // announce a signal named value which is a data array
  @Input() value!:any

  @Input() isSearchDisabled: boolean = false;
  @Input() detailTemplate!: TemplateRef<any>;
  @Input() titleTemplate!: TemplateRef<any>;
  @Input() listTemplate!: TemplateRef<any>;

  @Output() sendRow = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  currentIndex: number = 0;
  row : any;
  rowYaml: any;
  isDetail: boolean = false;
  isSearch: boolean = false;
  searchText: string = '';

  valueSignal = signal<any>([]);



  ngOnInit(): void {
    this.valueSignal.set(this.value);
    this.row = this.valueSignal()[0];
    console.log(this.valueSignal())
    console.log(this.row)
    this.createYaml();

  }
  // 用來取得物件(外部灌進來的資料）的key
  getKey(obj: any, index: number): string {
    // if there is no object return empty string
    if (!obj) {
      return '';
    }
    return Object.keys(obj)[index];
  }

  onDetailClick(): void {
    this.isDetail = true;
  }

  // 前後切換按鈕（利用currentIndex來紀錄）
  onPrevClick(): void {
    if (this.currentIndex > 0 && this.currentIndex < this.value.length) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.value.length - 1;
    }
    this.changeRow();
    this.createYaml();
  }

  onNextClick(): void {
    if (this.currentIndex < this.value.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.changeRow();
    this.createYaml();
  }

  onSearch(text: string) {
    this.search.emit(text);
    this.currentIndex = 0;
    this.valueSignal.set(this.value);
  }

  onSearchClear(): void {
    this.searchText = '';
  }

  onListClick(): void {
    this.isSearch = true;
  }

  onRowSelect(rowIndex: any) {
    this.currentIndex = rowIndex;
    this.changeRow();
    this.createYaml();
  }

  changeRow() {
    this.row = this.valueSignal()[this.currentIndex];
    this.sendRow.emit(this.row);
  }

  createYaml() {
    if (
      this.detailTemplate == undefined ||
      this.titleTemplate == undefined ||
      this.listTemplate == undefined
    ) {
      this.rowYaml = jsyaml.dump(this.row);
    }
  }

}

