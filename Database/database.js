import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('characterData.db');

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        gender TEXT NOT NULL,
        vitality INTEGER NOT NULL DEFAULT 10,
        strength INTEGER NOT NULL DEFAULT 1,
        intelligence INTEGER NOT NULL DEFAULT 1
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS combatEnemy (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level INTEGER NOT NULL DEFAULT 1,
        vitality INTEGER NOT NULL DEFAULT 5,
        strength INTEGER NOT NULL DEFAULT 1,
        intelligence INTEGER NOT NULL DEFAULT 0
      );`
    );

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

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS levels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        hint1 TEXT,
        hint2 TEXT,
        hint3 TEXT,
        completed INTEGER NOT NULL DEFAULT 0
      );`
    );

    const levels = [
      { word: 'YOGA', hint1: 'This exercise originated in ancient India.', hint2: 'It involves a lot of stretching and breathing exercises.', hint3: 'It helps improve flexibility and reduce stress.' },
      { word: 'PUSHUP', hint1: 'This exercise works your chest, shoulders, and triceps.', hint2: 'It is a fundamental exercise in military training programs.', hint3: 'It is sometimes referred to as a "press-up" in some regions.' },
      { word: 'PLANK', hint1: 'It is often used to improve core strength, stability, and endurance.', hint2: 'It is a static exercise that targets the core muscles.', hint3: 'The body is held in a straight line from head to heels, supported by the forearms and toes.' },
      { word: 'ABDOMEN', hint1: 'It is a key focus area for core strength and stability exercises.', hint2: 'It is scientifically known as the Rectus Abdominis', hint3: 'It is a part of the human body located between the chest and pelvis.' },
      { word: 'JOGGING', hint1: 'It is often done as a form of cardiovascular exercise to improve endurance and overall fitness.', hint2: 'It can be done outdoors on trails, tracks, or sidewalks, or indoors on treadmills.', hint3: 'It is a form of aerobic exercise that involves running at a steady, gentle pace.' },
      { word: 'MEDITATE', hint1: 'It has been practiced for centuries in various cultures and religions.', hint2: 'It is a practice that involves focusing the mind and cultivating awareness.', hint3: 'It typically involves sitting or lying down in a quiet environment.' },
    ];

    levels.forEach((level) => {
      tx.executeSql(
        'INSERT INTO levels (word, hint1, hint2, hint3) VALUES (?, ?, ?, ?)',
        [level.word, level.hint1, level.hint2, level.hint3]
      );
    });

    tx.executeSql(
      'INSERT INTO combatEnemy (level, vitality, strength, intelligence) VALUES (1, 5, 1, 0)',
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

export const getEnemy = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM combatEnemy LIMIT 1',
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

export const markLevelCompleted = (levelId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE levels SET completed = 1 WHERE id = ?',
        [levelId],
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

export const getLevelData = (levelId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT word, hint1, hint2, hint3 FROM levels WHERE id = ?',
        [levelId],
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

export const getUnfinishedLevel = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT id, word, hint1, hint2, hint3 FROM levels WHERE completed = 0 ORDER BY id LIMIT 1',
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows._array[0]);
          } else {
            resolve(null); // All levels are completed
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};