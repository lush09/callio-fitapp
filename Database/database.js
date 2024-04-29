import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('characterData.db');

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE IF EXISTS characters;'); // Add this line
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        gender TEXT NOT NULL,
        vitality INTEGER NOT NULL DEFAULT 5,
        strength INTEGER NOT NULL DEFAULT 1,
        intelligence INTEGER NOT NULL DEFAULT 1
      );`
    );
  });
};

export const createCharacter = (username, isMale) => {
  const gender = isMale ? 'male' : 'female';
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO characters (username, gender, vitality, strength, intelligence) VALUES (?, ?, 5, 1, 1)', // Add the gender column here
        [username, gender], // Pass the gender value here
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
export const getCharacter = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM characters LIMIT 1',
        [],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};