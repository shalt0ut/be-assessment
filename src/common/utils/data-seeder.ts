import { readFileSync } from 'fs';

class DataSeeder {
  // READ JSON FILE

  constructor() {}

  // IMPORT DATA INTO DB
  async importData() {
    try {
    } catch (err) {
      console.log(`Import Error ${err}`);
    }
  }

  // DELETE ALL DATA FROM DB
  async deleteData() {
    try {
    } catch (err) {
      console.log(`Delete Error: ${err}`);
    }
  }
}

const dataSeeder = new DataSeeder();
export default dataSeeder;
