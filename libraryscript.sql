create database `librarydb`;
use librarydb;

create table member (
    libraryCardNumber VARCHAR(50) PRIMARY KEY NOT NULL,
	fname varchar(50) NOT NULL,
	lastname varchar(50) NOT NULL,
    age INT NOT NULL,
    dateRegistered DATE NOT NULL,
    phoneNumber varchar(20) NOT NULL
);
create table staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
	fname varchar(50) NOT NULL,
	lastname varchar(50) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
	role ENUM('Manager', 'Librarian') NOT NULL,
	email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    dateHired DATE
);
create table book (
    isbn varchar(50) PRIMARY KEY NOT NULL,
	title varchar(50) NOT NULL,
    author varchar(50) NOT NULL,
    genre varchar(25) NOT NULL,
    publishDate DATE,
    shelfLocation varchar(5) NOT NULL
);
create table book_copies (
	copyID INT AUTO_INCREMENT PRIMARY KEY,
    isbn varchar(50) NOT NULL,
    copiesTotal INT NOT NULL,
	FOREIGN KEY (isbn) REFERENCES book(isbn)
);
create table transaction (	
	transactionId varchar(50) PRIMARY KEY,
    dateCreated DATE,
    returnDate DATE,
    isbn varchar(50),
    status ENUM('Rented','Completed','Late'),
	libraryCardNumber varchar(50) NOT NULL,
    staffID INT NOT NULL,
    FOREIGN KEY (isbn) REFERENCES book(isbn),
    FOREIGN KEY (libraryCardNumber) REFERENCES member(libraryCardNumber),
    FOREIGN KEY (staffID) REFERENCES staff(id)
);

INSERT INTO staff (fname, lastname, gender, role, email, password, dateHired)
VALUES ('John', 'Doe', 'Male', 'Manager', 'john_doe@gmail.com', '$2a$10$XVOUMmEIPN6HUznW1p5GsOj256jq59IB4G2u4Wer.cvrG6Twa8CfG', '2022-01-15');

INSERT INTO staff (fname, lastname, gender, role, email, password, dateHired)
VALUES
    ('James', 'Wilson', 'Male', 'Librarian', 'james@example.com', '$2a$10$0fM2w3WK8BbwKKqSSfuNh.SkqdW.xm1d4gzu3Hr.TSUZxeS3m5FnW', '2021-02-24'),
	('Sarah', 'Johnson', 'Female', 'Accountant', 'sarah@example.com', '$2a$10$Ql7ctgd0yM2IpfbHr2p1COriKco9I1WaYdhAVpEt5JtgTU0GZnOi6', '2022-05-15'),
    ('Michael', 'Smith', 'Male', 'Marketing Manager', 'michael@example.com', '$2a$10$AWNbG1CjVhR6SfH0ITiTDuD.hFOeHcx1QU4Fc8BOLdiOwrtJVVvQa', '2023-09-10');


INSERT INTO member (libraryCardNumber, fname, lastname, age, dateRegistered, phoneNumber)
VALUES
    (UUID(), 'Tom', 'Wilson', 31, '2022-10-20', '555-666-3333'),    
    (UUID(), 'Alice', 'Johnson', 25, '2023-01-15', '555-777-4444'),
    (UUID(), 'John', 'Smith', 29, '2023-02-28', '555-888-5555'),
    (UUID(), 'Emily', 'Brown', 22, '2022-11-10', '555-999-6666'),
    (UUID(), 'Daniel', 'Jones', 27, '2022-09-05', '555-333-7777'),
    (UUID(), 'Olivia', 'Davis', 35, '2023-03-20', '555-444-8888'),
    (UUID(), 'Liam', 'Miller', 30, '2023-04-15', '555-555-9999'),
    (UUID(), 'Ava', 'Wilson', 28, '2022-12-05', '555-666-1111'),
    (UUID(), 'Mason', 'Anderson', 26, '2022-08-10', '555-777-2222'),
    (UUID(), 'Sophia', 'Martin', 23, '2022-07-25', '555-888-3333'),
    (UUID(), 'Ethan', 'Harris', 32, '2023-05-30', '555-999-4444'),
    (UUID(), 'Isabella', 'Jackson', 33, '2023-06-20', '555-333-5555'),
    (UUID(), 'Liam', 'White', 29, '2023-07-15', '555-444-6666'),
    (UUID(), 'Ava', 'Thompson', 31, '2022-06-10', '555-555-7777'),
	(UUID(), 'Noah', 'Johnson', 28, '2023-08-05', '555-666-0000'),
	(UUID(), 'Grace', 'Anderson', 24, '2023-10-19', '555-777-1111'),
    (UUID(), 'Benjamin', 'Harris', 30, '2023-10-19', '555-777-2222'),
    (UUID(), 'Evelyn', 'Miller', 29, '2023-10-18', '555-777-3333'),
    (UUID(), 'Henry', 'Brown', 26, '2023-10-18', '555-777-4444'),
    (UUID(), 'Chloe', 'Wilson', 27, '2023-10-17', '555-777-5555');
    
INSERT INTO book (isbn, title, author, genre, publishDate, shelfLocation)
VALUES
    ('978-0743273568', 'The Shining', 'Stephen King', 'Horror', '1977-01-01', 'B20'),
    ('978-0451166609', 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', '1960-07-11', 'A12'),
    ('978-0679720201', '1984', 'George Orwell', 'Dystopian', '1949-06-08', 'C05'),
    ('978-0141441149', 'Pride and Prejudice', 'Jane Austen', 'Romance', '1813-01-28', 'D10'),
    ('978-0739349487', 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', '1937-09-21', 'B08'),
    ('978-0061120084', 'To Kill a Mockingbird', 'J.K. Rowling', 'Fantasy', '1997-06-26', 'A17'),
    ('978-0060256650', 'Alice in Wonderland', 'Lewis Carroll', 'Fantasy', '1865-07-04', 'C22'),
    ('978-1400079983', 'The Catcher in the Rye', 'J.D. Salinger', 'Coming-of-age', '1951-07-16', 'A05'),
    ('978-0743273568', 'The Stand', 'Stephen King', 'Horror', '1978-09-01', 'B15'),
    ('978-0061120084', 'Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 'Fantasy', '1997-06-26', 'A13'),
    ('978-0141439771', 'Moby-Dick', 'Herman Melville', 'Adventure', '1851-10-18', 'C15'),
    ('978-0671728196', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', '1925-04-10', 'D11'),
    ('978-0451524935', 'Lord of the Flies', 'William Golding', 'Adventure', '1954-09-17', 'B11'),
    ('978-0064407311', 'The Giver', 'Lois Lowry', 'Dystopian', '1993-04-26', 'C08'),
    ('978-0199535569', 'War and Peace', 'Leo Tolstoy', 'Historical Fiction', '1869-01-01', 'A23'),
    ('978-0064451306', 'The Little Prince', 'Antoine de Saint-Exupéry', 'Children\'s', '1943-04-06', 'D20');


INSERT INTO book_copies (isbn, copiesTotal)
VALUES
 ('978-0451526538', 10),
 ('978-0743273568', 4),
 ('978-0451166609', 6),
 ('978-0679720201', 24),
 ('978-0141441149', 13),
 ('978-0739349487', 17),
 ('978-0061120084', 6),
 ('978-0060256650', 8),
 ('978-1400079983', 24),
 ('978-0743273568', 36),
 ('978-0061120084', 12),
 ('978-0141439771', 14),
 ('978-0671728196', 15),
 ('978-0451524935', 12),
 ('978-0064407311', 18),
 ('978-0199535569', 35),
 ('978-0064451306', 24);


INSERT INTO transaction (transactionId, dateCreated, returnDate, isbn, status, libraryCardNumber, staffID)
VALUES (UUID(), '2023-04-12', '2023-04-22', '978-0451526532', 'Rented',
        (SELECT libraryCardNumber FROM member WHERE fname = 'John' LIMIT 1),
        (SELECT id FROM staff WHERE fname = 'Sarah' LIMIT 1));
UPDATE book_copies SET copiesTotal = copiesTotal - 1 WHERE isbn = '978-0451526532';


INSERT INTO transaction (transactionId, dateCreated, returnDate, isbn, status, libraryCardNumber, staffID)
VALUES (UUID(), '2023-06-12', '2023-06-22', '978-0451526536', 'Rented',
        (SELECT libraryCardNumber FROM member WHERE fname = 'John' LIMIT 1),
        (SELECT id FROM staff WHERE fname = 'Sarah' LIMIT 1));
UPDATE book_copies SET copiesTotal = copiesTotal - 1 WHERE isbn = '978-0451526536';


INSERT INTO transaction (transactionId, dateCreated, returnDate, isbn, status, libraryCardNumber, staffID)
VALUES (UUID(), '2023-11-03', '2023-08-14', '978-0451526532', 'Completed',
        (SELECT libraryCardNumber FROM member WHERE fname = 'Mike' LIMIT 1),
        (SELECT id FROM staff WHERE fname = 'James' LIMIT 1));
UPDATE book_copies SET copiesTotal = copiesTotal - 1 WHERE isbn = '978-0451526532';



DELIMITER //
CREATE TRIGGER update_transaction_status
BEFORE INSERT ON transaction
FOR EACH ROW
BEGIN
    IF NEW.returnDate < CURDATE() THEN
        SET NEW.status = 'Late';
    END IF;
END;
//
DELIMITER ;

-- QUERIES FOR GETTING DATA
select * from member;
select * from staff;
select * from book;
select * from book_copies;
select * from transaction;

SELECT * FROM member WHERE DATE(dateRegistered) >= DATE(NOW() - INTERVAL 30 DAY) LIMIT 5;

SELECT COUNT(*) as newmember_count FROM member
WHERE DATE(dateRegistered) >= DATE(NOW() - INTERVAL 30 DAY);

SELECT COUNT(*) as member_count FROM member;

select Count(*) as lowbook_count from book b JOIN book_copies c ON b.isbn = c.isbn WHERE c.copiesTotal < 15;

select COUNT(*) as book_count from book;
select b.isbn,b.title, c.copiesTotal,b.author,b.genre from book b JOIN book_copies c ON b.isbn = c.isbn WHERE c.copiesTotal < 15 LIMIT 5;

select COUNT(*) as transaction_count from transaction;
select COUNT(*) as transactionRented_count from transaction WHERE status = "Rented";

select t.transactionId, t.dateCreated, t.returnDate, b.title,t.status from transaction t JOIN book b ON b.isbn = t.isbn 
WHERE t.status = "Rented" ORDER BY t.dateCreated DESC LIMIT 8;

select libraryCardNumber,fname,lastname,age,dateRegistered,phoneNumber from member limit 50;

select * from book b JOIN book_copies cp ON b.isbn = cp.isbn;

select * from transaction;

select t.transactionId, t.dateCreated, t.returnDate, t.status, s.fname as staffname, b.title, m.fname,m.lastname from transaction t JOIN book b ON b.isbn = t.isbn JOIN staff s ON s.id = t.staffID JOIN member m on m.libraryCardNumber = t.libraryCardNumber;