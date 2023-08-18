import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataList: any[] = [
    {
      id: 0,
      name: ' from app.compo. Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
    },
    {
      id: 3,
      name: 'Homesteady Housing',
      city: 'Chicago',
      state: 'IL',
    },
    {
      id: 4,
      name: 'Happy Homes Group',
      city: 'Gary',
      state: 'IN',
    },
    {
      id: 5,
      name: 'Hopeful Apartment Group',
      city: 'Oakland',
      state: 'CA',
    },
    {
      id: 6,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
    },
    {
      id: 7,
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
    },
    {
      id: 8,
      name: 'Seriousl Towns',
      city: 'Oakland',
      state: 'CA',
    },
    {
      id: 9,
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
    },
  ];
  searchedDataList: any = this.dataList;

  setData(data: any[]): void {
    this.dataList = data;
  }

  getData() {
    return this.dataList;
  }

  search(text: string) {
      this.searchedDataList = this.dataList;
      if (!text) {
        return this.dataList;
      }
      // ?.等於&& ，條件判斷語句，如果data存在，就執行後面的語句，如果不存在，就不執行後面的語句
      this.searchedDataList = this.dataList.filter((x) =>
        x?.name.toLowerCase().includes(text.toLowerCase())
      );
      return this.searchedDataList;
  }
}
