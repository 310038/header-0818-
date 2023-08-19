// 8/17 22:30
import { ButtonModule } from 'primeng/button';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
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
export class HeaderComponent  implements OnInit {

  #value: any;
  @Input()
  set value(value: any) {
    this.#value = value;
    if (value && value.length > 0) {
      this.#currentIndex=0;   // 有資料時，currentIndex 設為 0
    }
    else {
      this.#currentIndex=-1;  // 沒有資料時，currentIndex 設為 -1
    }
  }
  get value(): any {
    return this.#value;
  }
  @Input() titleTemplate!: TemplateRef<any>;
  @Input() detailTemplate!: TemplateRef<any>;
  @Input() listTemplate!: TemplateRef<any>;
  @Input() isSearchDisabled: boolean = false;

  @Output() search = new EventEmitter<any>();

  @Output() change = new EventEmitter<any>();

  yamlDocument: any;
  searchText: string = '';
  isShowDetail: boolean = false;
  isShowList: boolean = false;

  #initValue: any;
  #currentIndex = -1; // 沒有資料時，currentIndex 設為 -1
  #currentRow: any;

    /**
   * 初始化
   */
    ngOnInit(): void {
      this.#initValue = this.value;
    }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.onChange();
    this.isUseDefaultTemplate();
  }



  /**
   * 上一筆資料
   */
  onPrevClick(): void {
    this.#currentIndex =  this.#currentIndex > 0 ? this.#currentIndex - 1 : this.#value.length - 1;
    this.onChange();
    this.isUseDefaultTemplate();
  }
  /**
   * 下一筆資料
   */
  onNextClick(): void {
    this.#currentIndex = this.#currentIndex < this.value.length - 1 ? this.#currentIndex + 1 : 0;
    this.onChange();
    this.isUseDefaultTemplate();
  }
  /**
   * 目前顯示資料欲變更
   */
  onChange(){
    this.#currentRow = this.#value[this.#currentIndex];
    this.change.emit(this.#currentRow);
  }

  /**
   * 點選一筆資料
   * @param rowIndex
   */
  onRowSelect(rowIndex: number) {
    this.#currentIndex=rowIndex;
    this.onChange();
    this.isUseDefaultTemplate();
  }

  /**
   * 搜尋資料
   * @param searchText
   */
  onSearch(searchText: string): void {
    this.search.emit(searchText);
    console.log('觸發 onSearch');
    this.#currentIndex=-1;
    // if (this.isUseDefaultTemplate()) {
    //   this.yamlDocument = jsyaml.dump(this.#value[0]);
    // }
  }

  /**
   * 清除搜尋
  */
  onSearchClear(): void {
    this.searchText = '';
    this.value = this.#initValue; // 回復原始資料
    this.onChange();
    this.isUseDefaultTemplate();
  }


  /**
   * 是否使用預設的 template
   */
  isUseDefaultTemplate() {
    if (this.detailTemplate == undefined || this.titleTemplate == undefined) {
      this.yamlDocument = jsyaml.dump(this.#currentRow);
    }
  }

  /**
   * 取得物件的 key
   */
  getKey(value: any, index: number): string {
    return value ? Object.keys(value)[index] || '' : '';
  }
}

