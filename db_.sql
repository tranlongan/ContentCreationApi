-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 03, 2023 lúc 09:50 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_do_an_cn2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id_account` int(11) NOT NULL,
  `email_account` longtext NOT NULL,
  `username` longtext NOT NULL,
  `password` varchar(32) NOT NULL,
  `birthday` date NOT NULL,
  `phone` int(10) NOT NULL,
  `avatar` longtext NOT NULL,
  `background` longtext NOT NULL,
  `introduce_yourself` varchar(200) NOT NULL,
  `is_store_registered` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id_account`, `email_account`, `username`, `password`, `birthday`, `phone`, `avatar`, `background`, `introduce_yourself`, `is_store_registered`) VALUES
(1, 'norman@gmail.com', 'norman', '123', '2001-10-05', 1234567890, 'http://localhost:3001/avatar/default/default.jpg', 'http://localhost:3001/background/default/default.jpg', '', 1),
(2, 'user.1@gmail.com', 'user_1', '123', '2001-10-05', 1234567890, 'http://localhost:3001/avatar/image-1682840583062.jpg', 'http://localhost:3001/background/image-1682840298548.jpg', '', 0),
(3, 'user.2@gmail.com', 'user_2', '123', '2001-10-05', 1234567890, 'http://localhost:3001/avatar/image-1682838895829.jpg', 'http://localhost:3001/background/image-1682839689102.png', 'Còn nhiều chức năng vẫn còn thiếu, hứa hẹn trong tương lai sẽ bổ sung nhiều hơn', 0),
(4, 'user.3@gmail.com', 'user_3', '123', '2001-10-05', 1234567890, 'http://localhost:3001/avatar/image-1682840908703.jpg', 'http://localhost:3001/background/image-1682841283618.jpg', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `articles`
--

CREATE TABLE `articles` (
  `id_article` int(11) NOT NULL,
  `id_user` int(8) NOT NULL,
  `title_article` longtext NOT NULL,
  `tags` longtext NOT NULL,
  `illustration_for_article` longtext NOT NULL,
  `content` longtext NOT NULL,
  `materials` longtext NOT NULL,
  `likes` int(8) NOT NULL,
  `comments` int(8) NOT NULL,
  `article_date` date NOT NULL,
  `is_accept` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `articles`
--

INSERT INTO `articles` (`id_article`, `id_user`, `title_article`, `tags`, `illustration_for_article`, `content`, `materials`, `likes`, `comments`, `article_date`, `is_accept`) VALUES
(6, 1, 'Chủ đề 1', 'tag1', 'http://localhost:3001/upload/illustration/image-1682843478088.jpg', '<figure class=\"image\"><img src=\"http://localhost:3001/upload/contentImage/image-1682843452012.jpg\"></figure><p>Ảnh minh họa =)</p>', '[{\"material\":\"Vật liệu A\",\"whereBuy\":\"http://localhost:3000/profile/norman?id=1\"}]', 0, 0, '2023-04-30', 0),
(7, 2, 'Chủ đề 2', 'tag2', 'http://localhost:3001/upload/illustration/image-1682843518133.jpg', '<figure class=\"image\"><img src=\"http://localhost:3001/upload/contentImage/image-1682843510432.jpg\"></figure><p>Ảnh minh họa :v</p>', '[]', 0, 0, '2023-04-30', 0),
(8, 3, 'Chủ đề 3', 'tag3', 'http://localhost:3001/upload/illustration/image-1682843564532.jpg', '<figure class=\"image\"><img src=\"http://localhost:3001/upload/contentImage/image-1682843553080.jpg\"></figure><p>Ảnh minh họa :3</p>', '[]', 0, 0, '2023-04-30', 0),
(9, 4, 'Chủ đề 4', 'tag4', 'http://localhost:3001/upload/illustration/image-1682843620664.jpg', '<figure class=\"image\"><img src=\"http://localhost:3001/upload/contentImage/image-1682843610072.jpg\"></figure><p>Ảnh minh họa nà</p>', '[]', 0, 0, '2023-04-30', 0),
(10, 1, 'Chủ đề 5', 'tag5', 'http://localhost:3001/upload/illustration/image-1682856952240.jpg', '<figure class=\"image\"><img src=\"http://localhost:3001/upload/contentImage/image-1682856942361.jpg\"></figure><p>Ảnh minh họa nà</p>', '[]', 0, 0, '2023-04-30', 0),
(11, 4, 'Chủ đề 5', '#tag6', 'http://localhost:3001/upload/illustration/image-1683811692609.jpg', '<figure class=\"image\"><img src=\"http://localhost:3001/upload/contentImage/image-1683811560358.jpg\"></figure><p>Ảnh minh họa :3</p>', '[{\"material\":\"Vật liệu C\",\"whereBuy\":\"https://shopee.vn/Tai-Nghe-Sony-MDR-XB550AP-i.15376738.391226083?sp_atk=349fef6c-d534-47e8-b5e7-759621cd9495&xptdk=349fef6c-d534-47e8-b5e7-759621cd9495\"}]', 0, 0, '2023-05-11', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `id_user` int(8) NOT NULL,
  `id_store` int(8) NOT NULL,
  `id_store_category` int(8) NOT NULL,
  `name_product` longtext NOT NULL,
  `illustration_for_product` longtext NOT NULL,
  `price` float NOT NULL,
  `options_for_product` longtext NOT NULL,
  `quantity_product` int(8) NOT NULL,
  `description_for_product` longtext NOT NULL,
  `image_describe_product` longtext NOT NULL,
  `evaluate` longtext NOT NULL,
  `date_upload_product` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id_product`, `id_user`, `id_store`, `id_store_category`, `name_product`, `illustration_for_product`, `price`, `options_for_product`, `quantity_product`, `description_for_product`, `image_describe_product`, `evaluate`, `date_upload_product`) VALUES
(6, 1, 3, 1, 'Sản phẩm 1', 'http://localhost:3001/upload/illustration/image-16843211125300.5812500462802963.jpg\n                         ', 9500100, '[{\"nameOption\":\"Option 1\",\"quantityOption\":\"4\"},{\"nameOption\":\"Option 2\",\"quantityOption\":\"6\"}]', 10, '[object Object]', '[\"http://localhost:3001/upload/imgDescribe/images-16843211125310.07148265018930133.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16843211125320.42082249244257364.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16843211125330.6634576098000284.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16843211125330.23336445999844502.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16843211125340.42439293803332534.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16843211125340.5313457097484511.jpg\"]', 'Chưa có', '2023-05-17'),
(7, 1, 3, 2, 'Sản phẩm 2', 'http://localhost:3001/upload/illustration/image-16853633835610.9525565798416429.jpg\n                         ', 400000, '[{\"nameOption\":\"Đỏ\",\"quantityOption\":\"10\"},{\"nameOption\":\"Vàng\",\"quantityOption\":\"5\"}]', 15, '[object Object]', '[\"http://localhost:3001/upload/imgDescribe/images-16853633835610.5074098184701714.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16853633835620.07980518337176479.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16853633835620.0112361420971554.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16853633835630.8606601706022814.jpg\",\"http://localhost:3001/upload/imgDescribe/images-16853633835650.39073368660154006.jpg\"]', 'Chưa có', '2023-05-29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `store`
--

CREATE TABLE `store` (
  `id_store` int(11) NOT NULL,
  `id_user` int(8) NOT NULL,
  `name_store` longtext NOT NULL,
  `address` longtext NOT NULL,
  `citizen_id` int(12) NOT NULL,
  `phone` int(10) NOT NULL,
  `avatar_store` longtext NOT NULL,
  `background_store` longtext NOT NULL,
  `business_category` longtext NOT NULL,
  `store_category` longtext NOT NULL,
  `introduction_to_store` varchar(200) NOT NULL,
  `registration_date` date NOT NULL,
  `quantity_of_products` int(8) NOT NULL,
  `follower` int(8) NOT NULL,
  `following` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `store`
--

INSERT INTO `store` (`id_store`, `id_user`, `name_store`, `address`, `citizen_id`, `phone`, `avatar_store`, `background_store`, `business_category`, `store_category`, `introduction_to_store`, `registration_date`, `quantity_of_products`, `follower`, `following`) VALUES
(3, 1, 'Cửa hàng của Norman', '', 2147483647, 1234567890, 'http://localhost:3001/avatar/default/default.jpg', 'http://localhost:3001/background/default/default.jpg', 'Thiết bị điện tử', 'store_category', 'description', '2023-05-01', 0, 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `store_categories`
--

CREATE TABLE `store_categories` (
  `id_store_categories` int(11) NOT NULL,
  `id_user` int(8) NOT NULL,
  `id_store` int(8) NOT NULL,
  `name_store_category` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `store_categories`
--

INSERT INTO `store_categories` (`id_store_categories`, `id_user`, `id_store`, `name_store_category`) VALUES
(1, 1, 3, 'Danh mục 1'),
(2, 1, 3, 'Danh mục 2'),
(3, 1, 3, 'Danh mục 3'),
(4, 1, 3, 'Danh mục 4'),
(5, 1, 3, 'Danh mục 6');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`);

--
-- Chỉ mục cho bảng `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id_article`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- Chỉ mục cho bảng `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id_store`);

--
-- Chỉ mục cho bảng `store_categories`
--
ALTER TABLE `store_categories`
  ADD PRIMARY KEY (`id_store_categories`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id_account` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `articles`
--
ALTER TABLE `articles`
  MODIFY `id_article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `store`
--
ALTER TABLE `store`
  MODIFY `id_store` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `store_categories`
--
ALTER TABLE `store_categories`
  MODIFY `id_store_categories` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
