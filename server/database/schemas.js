const parcelSchema = `parcels(
            id SERIAL PRIMARY KEY,
            UserID INT NOT NULL,
            sender TEXT NOT NULL,
            receiver TEXT NOT NULL,
            item TEXT NOT NULL,
            pickup_location TEXT NOT NULL,
            destination TEXT NOT NULL,
            schedule TEXT NOT NULL,
            present_location TEXT NOT NULL,
            price INT NOT NULL,
            order_status TEXT NOT NULL,
            date_created TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (UserID) REFERENCES users(UserID)
        )`;

const userSchema = `users(
          UserID SERIAL PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          phone_number TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          pass_word TEXT NOT NULL,
          category TEXT NOT NULL,
          date_created TIMESTAMP DEFAULT NOW()
        )`;

export { userSchema, parcelSchema };
