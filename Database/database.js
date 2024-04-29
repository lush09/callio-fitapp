import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('characterData.db');

export const initializeDatabase = () => {
  db.transaction((tx) => {
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

    // Add missing columns if they don't exist
    tx.executeSql(
      `SELECT * FROM pragma_table_info('characters') WHERE name='height';`,
      [],
      (_, res) => {
        if (res.rows.length === 0) {
          tx.executeSql('ALTER TABLE characters ADD COLUMN height INTEGER;');
        }
      }
    );

    tx.executeSql(
      `SELECT * FROM pragma_table_info('characters') WHERE name='weight';`,
      [],
      (_, res) => {
        if (res.rows.length === 0) {
          tx.executeSql('ALTER TABLE characters ADD COLUMN weight INTEGER;');
        }
      }
    );

    tx.executeSql(
      `SELECT * FROM pragma_table_info('characters') WHERE name='age';`,
      [],
      (_, res) => {
        if (res.rows.length === 0) {
          tx.executeSql('ALTER TABLE characters ADD COLUMN age INTEGER;');
        }
      }
    );

    tx.executeSql(
      `SELECT * FROM pragma_table_info('characters') WHERE name='activity';`,
      [],
      (_, res) => {
        if (res.rows.length === 0) {
          tx.executeSql('ALTER TABLE characters ADD COLUMN activity TEXT;');
        }
      }
    );
  });
};

export const updateCharacterDetails = (height, weight, age, activity) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE characters SET height = ?, weight = ?, age = ?, activity = ?',
        [height, weight, age, activity],
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

export const createCharacter = (username, isMale) => {
  const gender = isMale ? 'male' : 'female';
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO characters (username, gender, vitality, strength, intelligence) VALUES (?, ?, 5, 1, 1)',
        [username, gender],
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