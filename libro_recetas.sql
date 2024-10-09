-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-10-2024 a las 23:12:04
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `libro_recetas`
--
CREATE DATABASE IF NOT EXISTS `libro_recetas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `libro_recetas`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos`
--

DROP TABLE IF EXISTS `archivos`;
CREATE TABLE `archivos` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `createAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `archivos`
--

INSERT INTO `archivos` (`id`, `idUsuario`, `imagen`, `createAt`, `deleteAt`) VALUES
(1, 1, '865032.jpg', '2024-09-16 16:37:35', '2024-09-16 16:18:16'),
(2, 1, 'file-1726103142309.jpg', '2024-09-16 16:37:35', NULL),
(3, 1, 'file-1726253487234.PNG', '2024-09-16 16:37:35', NULL),
(4, 1, 'file-1726499238700.jpg', '2024-09-16 12:19:06', NULL),
(5, 1, 'file-1726499929764.jpg', '2024-09-16 15:18:49', NULL),
(6, 1, 'file-1726503803359.png', '2024-09-16 16:23:23', NULL),
(7, 1, 'file-1726510057563.jpg', '2024-09-16 18:07:37', NULL),
(8, 1, 'file-1726510198561.jpg', '2024-09-16 18:09:58', NULL),
(9, 1, 'file-1726510766090.jpg', '2024-09-16 15:19:26', NULL),
(10, 1, 'file-1726510957757.jpg', '2024-09-16 15:22:37', NULL),
(11, 1, 'file-1726512526382.webp', '2024-09-16 15:48:46', NULL),
(12, 1, 'file-1726590848211.PNG', '2024-09-17 13:34:08', NULL),
(13, 1, 'file-1726590994336.PNG', '2024-09-17 13:36:34', NULL),
(14, 1, 'file-1726591483365.PNG', '2024-09-17 13:44:43', '2024-09-17 15:41:57'),
(15, 1, 'file-1726592221361.PNG', '2024-09-17 13:57:01', '2024-09-17 15:42:29'),
(16, 1, 'file-1726600183413.PNG', '2024-09-17 16:09:43', '2024-09-19 14:07:46'),
(17, 1, 'file-1726683473740.jpg', '2024-09-18 15:17:53', '2024-09-19 14:07:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `idReceta` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `comentario` varchar(1000) NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `idReceta`, `idUsuario`, `comentario`, `createAt`) VALUES
(1, 2, 1, 're manija esa receta ameo', '2024-10-08 14:40:03'),
(2, 2, 3, 'soy la primer respuesta al comentario principal', '2024-10-08 18:05:40'),
(3, 2, 5, 'soy la segunda respuesta a la primer respuesta del comentario princial', '2024-10-09 20:05:22'),
(4, 2, 3, 'soy el segundo comentario principal', '2024-10-09 01:39:10'),
(5, 2, 3, 'soy la segunda respuesta al comentario principal', '2024-10-09 01:41:50'),
(6, 2, 1, 'terrible receta qliao, me gusto mucho equisde', '2024-10-09 17:00:20'),
(8, 2, 1, 'capo soy yo de nuevo, se la pase a unos amigos y les encanto', '2024-10-09 17:18:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guardadas`
--

DROP TABLE IF EXISTS `guardadas`;
CREATE TABLE `guardadas` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `idReceta` int(11) UNSIGNED NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `idReceta` int(11) UNSIGNED NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id`, `idUsuario`, `idReceta`, `createAt`) VALUES
(1, 1, 5, '2024-10-04 19:56:38'),
(9, 1, 2, '2024-10-06 17:22:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

DROP TABLE IF EXISTS `recetas`;
CREATE TABLE `recetas` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `detalle` varchar(500) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `visibilidad` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `comensales` varchar(20) NOT NULL,
  `duracion` varchar(20) NOT NULL,
  `checked` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0=no verificado 1=verificado',
  `ingredientes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"name":""}]',
  `pasos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"paso":"","imagen":""}]',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id`, `idUsuario`, `titulo`, `detalle`, `imagen`, `visibilidad`, `comensales`, `duracion`, `checked`, `ingredientes`, `pasos`, `createAt`, `updateAt`, `deleteAt`) VALUES
(1, 1, 'pan con manteca', 'primero compras el pan, lo cortas con un cuchillo, abrís la manteca y la untas sobre el pan', '', 1, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(2, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', 'file-1726512404785.webp', 1, '5 persianas', '30 minutos', 1, '[{\"name\":\"1kg de harina\"},{\"name\":\"50gr de leudante\"}]', '[{\"paso\":\"merzclar las weas en un recipiente limpio\",\"imagen\":\"\"}]', NULL, NULL, NULL),
(3, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 1, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(4, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(5, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(6, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(7, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(8, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(9, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(10, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(12, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(13, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(25, 1, 'receta test', 'test', '', 1, '2 weones', '2 horas', 1, '[]', '[]', NULL, NULL, NULL),
(26, 1, 'bizcochuelo marmolado test', 'mezcla todo como venga ameo', '', 1, '5 personas', '1 hora', 1, '[]', '[]', NULL, NULL, NULL),
(28, 1, 'te con leche', 'es un te con leche pa', '', 1, '2 personas', '15 minutos', 1, '[]', '[]', NULL, NULL, NULL),
(29, 1, 'bizcochuelo marmolado test', 'mezcla todo como venga ameo', '', 1, '5 personas', '1 hora', 1, '[]', '[]', NULL, NULL, NULL),
(30, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(31, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(32, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]', NULL, NULL, NULL),
(33, 1, 'test middleware', '', '', 0, '', '', 0, '[]', '[]', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
CREATE TABLE `respuestas` (
  `id` int(11) UNSIGNED NOT NULL,
  `idComentario` int(11) UNSIGNED NOT NULL COMMENT 'id del comentario origen',
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `idUsuarioMension` int(11) UNSIGNED NOT NULL,
  `respuesta` varchar(1000) NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id`, `idComentario`, `idUsuario`, `idUsuarioMension`, `respuesta`, `createAt`) VALUES
(5, 1, 2, 1, 'chupala ameo no sabes una chota', '2024-10-09 15:25:40'),
(6, 3, 1, 2, 'no se, soy una respuesta, jiji', '2024-10-09 18:05:14'),
(7, 1, 1, 2, 'no se, soy una respuesta, jiji', '2024-10-09 18:05:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `usuario` varchar(16) NOT NULL,
  `contrasena` varchar(255) NOT NULL COMMENT 'pass: usuario123',
  `mail` varchar(50) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `apellidos`, `nombres`, `usuario`, `contrasena`, `mail`, `imagen`, `createAt`) VALUES
(1, '', '', 'usuario123', '$2a$10$733Dv09gafNx74PombmlW.9CtTu2HolqqTxJ3bW2lRxLkTbN5vYEu', 'mail_123@update.com', NULL, NULL),
(2, '', '', 'usuario456', '$2a$10$733Dv09gafNx74PombmlW.9CtTu2HolqqTxJ3bW2lRxLkTbN5vYEu', 'usu456@ario.com', NULL, NULL),
(3, '', '', 'usuario124', '$2a$10$733Dv09gafNx74PombmlW.9CtTu2HolqqTxJ3bW2lRxLkTbN5vYEu', 'mail@testeo.com', NULL, NULL),
(5, '', '', 'usuarioTest', '$2a$10$DiZim3xEPrsAmcuZuqx6pepMxXDfxwf8Q7aFkscnKZ9WENCR8LI3i', 'mail_equisde@testeo.com', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_usuario` (`idUsuario`) USING BTREE;

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_receta_comentario` (`idReceta`),
  ADD KEY `fk_usuario_comentario` (`idUsuario`);

--
-- Indices de la tabla `guardadas`
--
ALTER TABLE `guardadas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_usuario_receta` (`idUsuario`,`idReceta`) USING BTREE,
  ADD KEY `ix_idUsuario` (`idUsuario`) USING BTREE,
  ADD KEY `ix_idReceta` (`idReceta`) USING BTREE;

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_usuario_receta` (`idUsuario`,`idReceta`) USING BTREE,
  ADD KEY `ix_idUsuario` (`idUsuario`) USING BTREE,
  ADD KEY `ix_idReceta` (`idReceta`) USING BTREE;

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_usuario` (`idUsuario`) USING BTREE;

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_comentario` (`idComentario`),
  ADD KEY `ix_usuario` (`idUsuario`),
  ADD KEY `ix_idUsuarioMension` (`idUsuarioMension`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_usuario` (`usuario`) USING BTREE,
  ADD UNIQUE KEY `uq_mail` (`mail`) USING BTREE,
  ADD KEY `ix_usuario` (`usuario`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `guardadas`
--
ALTER TABLE `guardadas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD CONSTRAINT `fk_usuario2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_receta_comentario` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_comentario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `guardadas`
--
ALTER TABLE `guardadas`
  ADD CONSTRAINT `fk_receta_favorito` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_favorito` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_recetas_likes` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuarios_likes` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `fk_comentario_respuesta` FOREIGN KEY (`idComentario`) REFERENCES `comentarios` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_mension` FOREIGN KEY (`idUsuarioMension`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_respuesta` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
