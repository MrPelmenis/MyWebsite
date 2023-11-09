-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.168.10
-- Generation Time: Nov 09, 2023 at 10:22 PM
-- Server version: 8.1.0
-- PHP Version: 8.2.11

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
-- Dumping data for table `CommentLikes`
--

INSERT INTO `CommentLikes` (`ID`, `CommentID`, `UserID`) VALUES
(18, 19, 10),
(19, 15, 10),
(33, 21, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `ID` int NOT NULL,
  `AuthorName` varchar(100) NOT NULL,
  `Body` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LikeAmount` int NOT NULL,
  `Date_Time` datetime NOT NULL,
  `PostID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`ID`, `AuthorName`, `Body`, `LikeAmount`, `Date_Time`, `PostID`) VALUES
(21, 'p[etetis', 'C1', 1, '2023-10-30 20:31:46', 25),
(22, 'p[etetis', 'C2', 0, '2023-10-30 20:31:49', 25);

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE `Likes` (
  `ID` int NOT NULL,
  `PostID` int NOT NULL,
  `UserID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Likes`
--

INSERT INTO `Likes` (`ID`, `PostID`, `UserID`) VALUES
(134, 25, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `ID` int NOT NULL,
  `TITLE` varchar(1000) NOT NULL,
  `BODY` varchar(10000) NOT NULL,
  `AuthorName` varchar(40) NOT NULL,
  `AuthorEmail` varchar(1000) NOT NULL,
  `LikeAmount` int NOT NULL,
  `DATE_TIME` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`ID`, `TITLE`, `BODY`, `AuthorName`, `AuthorEmail`, `LikeAmount`, `DATE_TIME`) VALUES
(25, 'P1', 'aaa', 'p[etetis', 'petersontamzin@gmail.com', 1, '2023-10-30 20:31:40'),
(27, 'normunda ieraksts', 'yo', 'normudnsa', 'normundsmalnacs@gmail.com', 0, '2023-10-31 18:08:20');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `ID` int NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Nickname` varchar(100) NOT NULL,
  `ProfilePicture` varchar(10000) NOT NULL DEFAULT 'Default'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`ID`, `Email`, `Nickname`, `ProfilePicture`) VALUES
(4, 'timanisemils19@gmail.com', 'emils', 'Default'),
(9, 'normundsmalnacs@gmail.com', 'normudnsa', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB1CAYAAACbMxW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAS+SURBVHhe7Zy9axRBGMY3Rokm0XyZ+C2INhYW1jaCvYVgoWBhIViICIoWoo1YKAoKFoKFhYW9hZ1g419g6wd+JNHEmEs0atBE86wzcW+9yyWX3dmZZ58fhNu5pMjdb99533d3Z1rGtu76HQk6VphXQYbEkiKxpEgsKRJLisSSIrGkSCwpEkuKxJIisaRILCkSS4rEkiKxpEgsKRJLisSSIrGkSCwpEkuKxJIisaRILCkSS4rEklIqsU9+fIv2fngT9b1/Mf+D8cOpSfMXPJRq7c7u4dfRyMyMGf2jraUlGtqy04w4KFXE1pIKjravM0c8lCpiMfVa5j63OeLEacQil5UlxxWNM7HXJj9Hp8ZHore/fpp3/oLx2cqoGYmscCL2/tREdH1ObD2mf2vtddY4EZuUemB1e/Sgb1O0r22NeccdqH4tt76MmyNOnIhNVqOQerYyEj2b/m7eccfxji5zVH2yMeK0eAKImnptR95c7uqbj1pM/8j7rDgXWySQmo7a5z+nzYgLJ31sun9Mji2u+kpE6uFPQ1WpYPvKVfFrumJPg787v7YnOtLh/wWNUkUsQNRe7V5vRn+B0EZSQUitWenEgj2r2qqm5KWAiA+hoi6lWHCjpz8aaG01o2ow1T7q3xKnB/tzsrPb/DaMitqJWF/7x2R1jv7agkucB0cH47tBd79W4vdQUVtCuKDipHi6WPk0/wVBcq0vxlXxlKRWEbdYivh/l4KTiPX1bE/OJGw4m4p9/BLPr+s1R0uj2cLLJc7uxyK3XpkYM6P/8X1qCw1nVfGZucYe8moJPNTeaY5EVnjR7tzp2WCORFZ4IZa5iCkKL8SK7ClErCI0fwoRm2wzQmgdQqRUj5+WCeVYUiSWFIklRWJJkVhSJJYUiSVFYkmRWFJyEYu9HvAwmNa9FkfmlxQh9cTnD9HE7Gx8sZ9tb4dQyDxiT41/jKWCEB7TZCVzsclndZnu3ISWXjKfitMLsFiwWwmFkl5yrYqxcQi2KWDAzkShpJfMI3bz4Mv/PjxurF9o8hle12DKPVcZXXD1XQgzUeYRW+shbCxiCmGFmq3oF7Ok0ndye4ICUXtsbDj+skAIuanelnxJUBBipZ7v5PpoDORiarbc6RnwdjU4hEKsJRSB9ci1eEKUJp9IxAZevu7EdjuRKrAwOmSpIFexIJ1zkb+sYCyvbDT1uQAn2sNv/062Zhdr+USuU7Gl0YIsSxGbd2BLoPQK9RCq3kY4EWtZjGBM3Te7+3OVu1BLE3putTgVm+Tx96mG+ywhgk+v7c700qRtaez1bIvdCjBZE4RMYWLTLBTNl7r64mWYWVCrpcEyTqz4Y5EKci+eFgvEQWAtsrzAkZSKmQD59F7vRiqpwJuITYMeeMfQq6rLk083bItbkWaolVchlRVvIjYNIijddiynPcJ94qRU9lX03kasBcXV/o/vzCgbGHNqGm8j1rKc7fHqwZhT03gvFqCvRCvSbH5NkvVJ4iveT8WiOYKIWLF0JJYUiSVFYkmRWFIklhSJJUViSZFYUiSWFIklRWJJkVhSJJYUiSVFYkmRWFIklhSJJUViSZFYUiSWFIklRWJJkVhSJJYUiSVFYkmRWFIklhSJpSSK/gBe9tmCPMcgDQAAAABJRU5ErkJggg=='),
(10, 'petersontamzin@gmail.com', 'p[etetis', 'Default'),
(11, 'misterpelmenis@gmail.com', 'marls', 'Default');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CommentLikes`
--
ALTER TABLE `CommentLikes`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `LikeConstrainPostID` (`PostID`),
  ADD KEY `LikeConstrainUserID` (`UserID`);

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `IxEmail` (`Email`) USING BTREE,
  ADD UNIQUE KEY `IxNickname` (`Nickname`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CommentLikes`
--
ALTER TABLE `CommentLikes`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `LikeConstrainPostID` FOREIGN KEY (`PostID`) REFERENCES `Posts` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `LikeConstrainUserID` FOREIGN KEY (`UserID`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
