-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.1.118
-- Generation Time: Nov 02, 2023 at 05:13 PM
-- Server version: 8.1.0
-- PHP Version: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: WebPageDatabase
--
CREATE DATABASE IF NOT EXISTS WebPageDatabase DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE WebPageDatabase;

-- --------------------------------------------------------

--
-- Table structure for table CommentLikes
--

CREATE TABLE CommentLikes (
  ID int NOT NULL,
  CommentID int NOT NULL,
  UserID int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table CommentLikes
--

INSERT INTO CommentLikes (ID, CommentID, UserID) VALUES
(18, 19, 10),
(19, 15, 10),
(33, 21, 10);

-- --------------------------------------------------------

--
-- Table structure for table Comments
--

CREATE TABLE Comments (
  ID int NOT NULL,
  AuthorName varchar(100) NOT NULL,
  Body varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  LikeAmount int NOT NULL,
  Date_Time datetime NOT NULL,
  PostID int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table Comments
--

INSERT INTO Comments (ID, AuthorName, Body, LikeAmount, Date_Time, PostID) VALUES
(21, 'p[etetis', 'C1', 1, '2023-10-30 20:31:46', 25),
(22, 'p[etetis', 'C2', 0, '2023-10-30 20:31:49', 25);

-- --------------------------------------------------------

--
-- Table structure for table Likes
--

CREATE TABLE Likes (
  ID int NOT NULL,
  PostID int NOT NULL,
  UserID int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table Likes
--

INSERT INTO Likes (ID, PostID, UserID) VALUES
(134, 25, 10);

-- --------------------------------------------------------

--
-- Table structure for table Posts
--

CREATE TABLE Posts (
  ID int NOT NULL,
  TITLE varchar(1000) NOT NULL,
  BODY varchar(10000) NOT NULL,
  AuthorName varchar(40) NOT NULL,
  AuthorEmail varchar(1000) NOT NULL,
  LikeAmount int NOT NULL,
  DATE_TIME datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table Posts
--

INSERT INTO Posts (ID, TITLE, BODY, AuthorName, AuthorEmail, LikeAmount, DATE_TIME) VALUES
(25, 'P1', 'aaa', 'p[etetis', 'petersontamzin@gmail.com', 1, '2023-10-30 20:31:40'),
(27, 'normunda ieraksts', 'yo', 'normudnsa', 'normundsmalnacs@gmail.com', 0, '2023-10-31 18:08:20');

-- --------------------------------------------------------

--
-- Table structure for table Users
--

CREATE TABLE Users (
  ID int NOT NULL,
  Email varchar(100) NOT NULL,
  Nickname varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table Users
--

INSERT INTO Users (ID, Email, Nickname) VALUES
(4, 'timanisemils19@gmail.com', 'emils'),
(9, 'normundsmalnacs@gmail.com', 'normudnsa'),
(10, 'petersontamzin@gmail.com', 'p[etetis'),
(11, 'misterpelmenis@gmail.com', 'marls');

--
-- Indexes for dumped tables
--

--
-- Indexes for table CommentLikes
--
ALTER TABLE CommentLikes
  ADD PRIMARY KEY (ID);

--
-- Indexes for table Comments
--
ALTER TABLE Comments
  ADD PRIMARY KEY (ID);

--
-- Indexes for table Likes
--
ALTER TABLE Likes
  ADD PRIMARY KEY (ID),
  ADD KEY LikeConstrainPostID (PostID),
  ADD KEY LikeConstrainUserID (UserID);

--
-- Indexes for table Posts
--
ALTER TABLE Posts
  ADD PRIMARY KEY (ID);

--
-- Indexes for table Users
--
ALTER TABLE Users
  ADD PRIMARY KEY (ID),
  ADD UNIQUE KEY IxEmail (Email) USING BTREE,
  ADD UNIQUE KEY IxNickname (Nickname) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table CommentLikes
--
ALTER TABLE CommentLikes
  MODIFY ID int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table Comments
--
ALTER TABLE Comments
  MODIFY ID int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table Likes
--
ALTER TABLE Likes
  MODIFY ID int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table Posts
--
ALTER TABLE Posts
  MODIFY ID int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table Users
--
ALTER TABLE Users
  MODIFY ID int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table Likes
--
ALTER TABLE Likes
  ADD CONSTRAINT LikeConstrainPostID FOREIGN KEY (PostID) REFERENCES Posts (ID) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT LikeConstrainUserID FOREIGN KEY (UserID) REFERENCES Users (ID) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;