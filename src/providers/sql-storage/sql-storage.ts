import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorage {
  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {

  }

  getAll() {
    return this.db.executeSql('SELECT key, value FROM kv', []).then(data => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++) {
        results.push(JSON.parse(data.rows.item(i).value));
      }
      return results;
    });
  }

  get(key: string) {
    return this.db.executeSql('SELECT key, value FROM kv WHERE key = ? limit 1', [key]).then(data => {
      if (data.rows.length > 0) {
        return JSON.parse(data.rows.item[0].value);
      }
    });
  }

  remove(key: string) {
    return this.db.executeSql('DELETE FROM kv WHERE key = ?', [key]);
  }

  set(key: string, value: string) {
    return this.db.executeSql('INSERT OR REPLACE INTO kv(key, value) VALUES (?, ?)', [key, value]).then(
      data => {
        if (data.rows.length > 0) {
          return JSON.parse(data.rows.item(0).value);
        }
      }
    );
  }

  initializeDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' }).then(db => {
      this.db = db;
      return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', [])
        .then(data => {
          console.log('**after CREATE TABLE check', data);
        });
    });
  }
}
