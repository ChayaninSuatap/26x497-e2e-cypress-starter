import fs from "fs";

type User = {
  username: string;
  password: string;
  expenses: Expense[];
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
};

type DB = {
  users: User[];
};

const starterDB: DB = {
  users: [
    {
      username: "user1",
      password: "1234",
      expenses: [
        { id: "01", title: "coffee", amount: 50 },
        {
          id: "02",
          title: "Books",
          amount: 500,
        },
      ],
    },
    {
      username: "user2",
      password: "1234",
      expenses: [
        { id: "01", title: "IPhone", amount: 40000 },
        {
          id: "02",
          title: "IPad",
          amount: 35000,
        },
      ],
    },
  ],
};
export const DB = {
  read: function () {
    try {
      const dbAsString = fs.readFileSync("db.json", { encoding: "utf-8" });
      const db = JSON.parse(dbAsString) as DB;
      return db;
    } catch {
      this.write(starterDB);
      return starterDB;
    }
  },

  write: function (newDb: DB) {
    fs.writeFileSync("db.json", JSON.stringify(newDb), { encoding: "utf-8" });
  },
};
