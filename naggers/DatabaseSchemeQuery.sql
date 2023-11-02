-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.1.118
-- Generation Time: Nov 02, 2023 at 07:14 PM
-- Server version: 8.1.0
-- PHP Version: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `WebPageDatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `CommentLikes`
--

CREATE TABLE `CommentLikes` (
  `ID` int NOT NULL,
  `CommentID` int NOT NULL,
  `UserID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CommentLikes`
--
ALTER TABLE `CommentLikes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CommentLikeConstrainPostID` (`CommentID`),
  ADD KEY `CommentLikeConstrainUserID` (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CommentLikes`
--
ALTER TABLE `CommentLikes`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CommentLikes`
--
ALTER TABLE `CommentLikes`
  ADD CONSTRAINT `CommentLikeConstrainPostID` FOREIGN KEY (`CommentID`) REFERENCES `Comments` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CommentLikeConstrainUserID` FOREIGN KEY (`UserID`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;