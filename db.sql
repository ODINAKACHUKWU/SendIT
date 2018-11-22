-- \c sendit

CREATE TABLE users (
    UserID SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    pass_word TEXT NOT NULL,
    category TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE parcels (
    id SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    sender TEXT NOT NULL,
    reciever TEXT NOT NULL,
    item TEXT NOT NULL,
    pickup_location TEXT NOT NULL,
    destination TEXT NOT NULL,
    schedule TEXT NOT NULL,
    present_location TEXT NOT NULL,
    price INT NOT NULL,
    order_status TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (UserID) REFERENCES users(UserID)
);

-- INSERT INTO users 
-- (first_name, last_name, phone_number, email, pass_word, category)
-- VALUES ('Jerry', 'Books', '09036748935', 
-- 'jerrybooks@example.com', 'jerry123', 'Regular'), ('George', 'Smith',
-- '08133564895', 'georgesmith@example.com', 'george2468', 'Admin');

-- INSERT INTO parcels 
-- (sender, reciever, item, pickup_location, destination, schedule, 
-- present_location, price, order_status)
-- VALUES ('George Smith', 'Richard Brown', 'Blue bag', '12 Ring Road', 
-- '3 Bright street', '12-10-2018', '12 Ring Road', 1500, 
-- 'No delivered'), 
-- ('Jerry Books', 'Philip Matthew', 'PC', '1 Lake Avenue', 
-- '3 Norton Avenue', '12-10-2018', '1 Lake Avenue', 2000, 
-- 'Delivered');