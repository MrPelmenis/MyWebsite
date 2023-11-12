-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.1.185
-- Generation Time: Nov 12, 2023 at 12:01 AM
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
(22, 'p[etetis', 'C2', 0, '2023-10-30 20:31:49', 25),
(23, 'normudnsa', 'yo', 0, '2023-11-11 23:35:34', 27),
(24, 'p[etetis', 'sis labs', 0, '2023-11-12 00:00:50', 27);

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE `Likes` (
  `ID` int NOT NULL,
  `PostID` int NOT NULL,
  `UserID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(27, 'normunda ieraksts', 'yo', 'normudnsa', 'normundsmalnacs@gmail.com', 0, '2023-10-31 18:08:20');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `ID` int NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Nickname` varchar(100) NOT NULL,
  `ProfilePicture` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`ID`, `Email`, `Nickname`, `ProfilePicture`) VALUES
(4, 'timanisemils19@gmail.com', 'emils', NULL),
(9, 'normundsmalnacs@gmail.com', 'normudnsa', NULL),
(10, 'petersontamzin@gmail.com', 'p[etetis', 0x89504e470d0a1a0a0000000d49484452000000760000007508060000009b3315bf000000017352474200aece1ce90000000467414d410000b18f0bfc61050000000970485973000016250000162501495224f0000004be49444154785eed9cbd6b144118c637468926d17c99f82d88361616d63682bd8560a16061215888088a16a28d58280a0a1682858585bd859d60e35f60eb077e24d1c4984b346ad044f3ac33716fbdcb2597ddd999679f1f84dbb9a4c8dd6fdf79df7777675ac6b6eefa1d093a5698574186c49222b1a4482c29124b8ac49222b1a4482c29124b8ac49222b1a4482c29124b8ac49222b1a4482c29124b8ac49222b1a4482c29124b8ac49222b1a4482c29124b8ac492522ab14f7e7c8bf67e7813f5bd7f31ff83f1c3a949f3173c946aedceeee1d7d1c8cc8c19fda3ada5251adab2d38c382855c4d6920a8eb6af33473c942a6231f55ae63eb739e2c469c422979525c7158d33b1d7263f47a7c647a2b7bf7e9a77fe82f1d9caa81989ac7022f6fed444747d4e6c3da67f6bed75d638119b947a60757bf4a06f53b4af6d8d79c71da87e2db7be8c9b234e9c884d56a3907ab632123d9bfe6ede71c7f18e2e73547db231e2b47802889a7a6d47de5ceeea9b8f5a4cffc8fbac38175b24909a8edae73fa7cd880b277d6cba7f4c8e2daefa4a44eae14f4355a960fbca55f16bba624f83bf3bbfb6273ad2e1ff058d52452c40d45eed5e6f467f81d046524148ad59e9c4823dabdaaaa6e4a580880fa1a22ea55870a3a73f1a686d35a36a30d53eeadf12a707fb73b2b3dbfc368c8ada89585ffbc764758efeda824b9c074707e3bb4177bf56e2f750515b42b8a0e2a478ba58f934ff054172ad2fc655f194a45611b7588af87f97829388f5f56c4fce246c389b8a7dfc12cfafeb35474ba3d9c2cb25ceeec722b75e991833a3fff17d6a0b0d6755f199b9c61ef26a093cd4de698e445678d1eedce9d9608e4456782196b988290a2fc48aec2944ac22347f0a119b6c3342681d42a4548f9f9609e558522496148925456249915852249614892545624991585272118bbd1ef03098d6bd1647e6971421f5c4e70fd1c4ec6c7cb19f6d6f8750c83c624f8d7f8ca582101ed3642573b1c9677599eedc84965e329f8ad30bb058b05b0985925e72ad8ab17108b62960c0ce44a1a497cc2376f3e0cbff3e3c6eac5f68f2195ed760ca3d57195d70f55d083351e6115beb216c2c620a61859aade817b3a4d277727b8202517b6c6c38feb24008b9a9de967c49501062a59eefe4fa680ce4626ab6dce919f07635388442ac251481f5c8b5784294269f48c4065ebeeec4763b912ab0303a64a92057b1209d7391bfac602caf6c34f5b90027dac36fff4eb666176bf944ae53b1a5d1822c4b119b77604ba0f40af510aade4638116b598c604cdd37bbfb7395bb504b137a6eb538159be4f1f7a986fb2c21824fafedcef4d2a46d69ecf56c8bdd0a305913844c6162d32c14cd97bafae265985950aba5c1324eacf863910a722f9e160bc441602db2bcc091948a9900f9f45eef462aa9c09b884d831e78c7d0abaacb934f376c8b5b9166a895572195156f22360d2228dd762ca73dc27de2a454f655f4de46ac05c5d5fe8fefcc281b18736a1a6f23d6b29cedf1eac19853d3782f16a0af442bd26c7e4d92f549e22bde4fc5a239828858b174249614892545624991585224961489254562499158522496148925456249915852249614892545624991585224961489254562499158522496148925456249915852249614892545624991585224961489a5248afe005ef6d9823cc7200d0000000049454e44ae426082),
(11, 'misterpelmenis@gmail.com', 'marls', NULL);

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
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

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