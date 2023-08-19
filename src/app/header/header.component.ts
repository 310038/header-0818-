// 自主更改

/**
 * 孫博意見
 * this.#currentIndex盡量不要再太多地方可以更改，在onChange控制更改比較OK，降低未來Debug機率
 */

// how to rm git
// git rm -r --cached .
import { ButtonModule } from 'primeng/button';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
export class HeaderComponent implements OnInit, OnChanges {

  @Input() value: any;
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
  #currentIndex: number = -1;
  #currentRow: any;


  /**
   * 初始化
   */
  ngOnInit(): void {
    this.#initValue = this.value;
    this.currentRowChange(0);
  }
  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.currentRowChange(this.#currentIndex);
  }
  /**
   * currentRowChange
   * @param rowIndex
   */
  currentRowChange(rowIndex: number): void {
    if (rowIndex >= 0) {
      this.#currentRow = this.value[rowIndex];
      if (this.isUseDefaultTemplate()) {
        this.yamlDocument = jsyaml.dump(this.#currentRow);
      }
      this.#currentIndex = rowIndex;
      this.change.emit(this.#currentRow);
    }
  }


  /**
   * 上一筆資料
   */
  onPrevClick(): void {
    const rowIndex = (this.#currentIndex - 1 + this.value.length) % this.value.length;
    this.currentRowChange(rowIndex);
  }

  /**
   * 下一筆資料
   */
  onNextClick(): void {
    const rowIndex = (this.#currentIndex + 1) % this.value.length;
    this.currentRowChange(rowIndex);
  }
  /**
   * 點選一筆資料
   * @param rowIndex
   */
  onRowSelect(rowIndex: number) {
    this.currentRowChange(rowIndex);
  }

  /**
   * 搜尋資料
   * @param searchText
   */
  onSearch(searchText: string): void {

    // 自主更改
    this.currentRowChange(0)

    this.search.emit(searchText);
  }

  /**
   * 清除搜尋
  */
  onSearchClear(): void {
    this.searchText = '';
    this.value = this.#initValue; // 回復原始資料
    this.currentRowChange(this.#currentIndex);
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

