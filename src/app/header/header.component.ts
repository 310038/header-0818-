// 8/17 22:30
import { ButtonModule } from 'primeng/button';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  effect,
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
export class HeaderComponent  implements OnInit {

  #value: any;
  @Input()
  set value(value: any) {
    this.#value = value;
    console.log('觸發 set value且value=', value);
    if (value && value.length > 0) {
      this.#currentIndex.set(0);   // 有資料時，currentIndex 設為 0
    }
    else {
      this.#currentIndex.set(-1);  // 沒有資料時，currentIndex 設為 -1
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
  #currentIndex = signal(-1); // 沒有資料時，currentIndex 設為 -1
  #currentRow: any;


  constructor() {
    console.log('觸發 constructor');
    // 監聽 currentIndex 的變化
    effect(() => {
      // if(this.#currentIndex() < 0) return; // 沒有資料時，不執行(可以消掉ERROR TypeError: Cannot read properties of undefined (reading '-1'))
      this.#currentRow = this.value[this.#currentIndex()];
      console.log('觸發 effect且this.#currentRow=', this.#currentRow);
      if (this.isUseDefaultTemplate()) {
        this.yamlDocument = jsyaml.dump(this.#currentRow);
      }
      this.change.emit(this.#currentRow);
    })
  }

  /**
   * 初始化
   */
  ngOnInit(): void {
    console.log('觸發 ngOnInit');
    this.#initValue = this.value;
  }

  /**
   * 上一筆資料
   */
  onPrevClick(): void {
    this.#currentIndex.update(x => (x - 1 + this.value.length) % this.value.length);
  }
  /**
   * 下一筆資料
   */
  onNextClick(): void {
    this.#currentIndex.update(x => (x + 1) % this.value.length);
  }
  /**
   * 點選一筆資料
   * @param rowIndex
   */
  onRowSelect(rowIndex: number) {
    this.#currentIndex.set(rowIndex);
  }

  /**
   * 搜尋資料
   * @param searchText
   */
  onSearch(searchText: string): void {
    this.search.emit(searchText);
    console.log('觸發 onSearch');
    this.#currentIndex.set(-1);
    if (this.isUseDefaultTemplate()) {
      this.yamlDocument = jsyaml.dump(this.#value[0]);
    }
  }

  /**
   * 清除搜尋
  */
  onSearchClear(): void {
    this.searchText = '';
    this.value = this.#initValue; // 回復原始資料
    this.#currentIndex.set(0);
  }


  /**
   * 是否使用預設的 template
   */
  isUseDefaultTemplate() {
    return this.detailTemplate == undefined || this.titleTemplate == undefined
  }

  /**
   * 取得物件的 key
   */
  getKey(value: any, index: number): string {
    return value ? Object.keys(value)[index] || '' : '';
  }
}

