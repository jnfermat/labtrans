-- ----------------------------
-- Table structure for local
-- ----------------------------
DROP TABLE IF EXISTS `local`;
CREATE TABLE `local` (
  `id_local` int(11) NOT NULL,
  `nm_local` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_local`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of local
-- ----------------------------
INSERT INTO `local` VALUES ('2', 'Local 2');
INSERT INTO `local` VALUES ('1', 'Local 1');
INSERT INTO `local` VALUES ('3', 'Local 3');
INSERT INTO `local` VALUES ('4', 'Local 4');
INSERT INTO `local` VALUES ('5', 'Local 5');
INSERT INTO `local` VALUES ('6', 'Local 6');
INSERT INTO `local` VALUES ('7', 'Local 7');
INSERT INTO `local` VALUES ('8', 'Local 8');
INSERT INTO `local` VALUES ('9', 'Local 9');
INSERT INTO `local` VALUES ('10', 'Local 10');

-- ----------------------------
-- Table structure for reserva
-- ----------------------------
DROP TABLE IF EXISTS `reserva`;
CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `id_sala` int(11) DEFAULT NULL,
  `nm_responsavel` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dt_inicio` datetime DEFAULT NULL,
  `dt_termino` datetime DEFAULT NULL,
  `cafe` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nr_pessoas` int(11) DEFAULT NULL,
  `descricao` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_reserva`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for sala
-- ----------------------------
DROP TABLE IF EXISTS `sala`;
CREATE TABLE `sala` (
  `id_sala` int(11) NOT NULL,
  `id_local` int(11) DEFAULT NULL,
  `nm_sala` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_sala`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sala
-- ----------------------------
INSERT INTO `sala` VALUES ('3', '1', 'Sala 31');
INSERT INTO `sala` VALUES ('1', '1', 'Sala 11');
INSERT INTO `sala` VALUES ('2', '1', 'Sala 21');
INSERT INTO `sala` VALUES ('4', '1', 'Sala 41');
INSERT INTO `sala` VALUES ('5', '1', 'Sala 51');
INSERT INTO `sala` VALUES ('6', '1', 'Sala 61');
INSERT INTO `sala` VALUES ('7', '1', 'Sala 71');
INSERT INTO `sala` VALUES ('8', '1', 'Sala 81');
INSERT INTO `sala` VALUES ('9', '1', 'Sala 91');
INSERT INTO `sala` VALUES ('10', '1', 'Sala 101');
INSERT INTO `sala` VALUES ('11', '2', 'Sala 12');
INSERT INTO `sala` VALUES ('12', '2', 'Sala 22');
INSERT INTO `sala` VALUES ('13', '2', 'Sala 32');
INSERT INTO `sala` VALUES ('14', '2', 'Sala 42');
INSERT INTO `sala` VALUES ('15', '2', 'Sala 52');
INSERT INTO `sala` VALUES ('16', '2', 'Sala 62');
INSERT INTO `sala` VALUES ('17', '2', 'Sala 72');
INSERT INTO `sala` VALUES ('18', '2', 'Sala 82');
INSERT INTO `sala` VALUES ('19', '2', 'Sala 92');
INSERT INTO `sala` VALUES ('20', '2', 'Sala 102');
INSERT INTO `sala` VALUES ('21', '3', 'Sala 13');
INSERT INTO `sala` VALUES ('22', '3', 'Sala 23');
INSERT INTO `sala` VALUES ('23', '3', 'Sala 33');
INSERT INTO `sala` VALUES ('24', '3', 'Sala 43');
INSERT INTO `sala` VALUES ('25', '3', 'Sala 53');
INSERT INTO `sala` VALUES ('26', '3', 'Sala 63');
INSERT INTO `sala` VALUES ('27', '3', 'Sala 73');
INSERT INTO `sala` VALUES ('28', '3', 'Sala 83');
INSERT INTO `sala` VALUES ('29', '3', 'Sala 93');
INSERT INTO `sala` VALUES ('30', '3', 'Sala 103');
INSERT INTO `sala` VALUES ('31', '4', 'Sala 14');
INSERT INTO `sala` VALUES ('32', '4', 'Sala 24');
INSERT INTO `sala` VALUES ('33', '4', 'Sala 34');
INSERT INTO `sala` VALUES ('34', '4', 'Sala 44');
INSERT INTO `sala` VALUES ('35', '4', 'Sala 54');
INSERT INTO `sala` VALUES ('36', '4', 'Sala 64');
INSERT INTO `sala` VALUES ('37', '4', 'Sala 74');
INSERT INTO `sala` VALUES ('38', '4', 'Sala 84');
INSERT INTO `sala` VALUES ('39', '4', 'Sala 94');
INSERT INTO `sala` VALUES ('40', '4', 'Sala 104');
INSERT INTO `sala` VALUES ('41', '5', 'Sala 15');
INSERT INTO `sala` VALUES ('42', '5', 'Sala 25');
INSERT INTO `sala` VALUES ('43', '5', 'Sala 35');
INSERT INTO `sala` VALUES ('44', '5', 'Sala 45');
INSERT INTO `sala` VALUES ('45', '5', 'Sala 55');
INSERT INTO `sala` VALUES ('46', '5', 'Sala 65');
INSERT INTO `sala` VALUES ('47', '5', 'Sala 75');
INSERT INTO `sala` VALUES ('48', '5', 'Sala 85');
INSERT INTO `sala` VALUES ('49', '5', 'Sala 95');
INSERT INTO `sala` VALUES ('50', '5', 'Sala 105');
INSERT INTO `sala` VALUES ('51', '6', 'Sala 16');
INSERT INTO `sala` VALUES ('52', '6', 'Sala 26');
INSERT INTO `sala` VALUES ('53', '6', 'Sala 36');
INSERT INTO `sala` VALUES ('54', '6', 'Sala 46');
INSERT INTO `sala` VALUES ('55', '6', 'Sala 56');
INSERT INTO `sala` VALUES ('56', '6', 'Sala 66');
INSERT INTO `sala` VALUES ('57', '6', 'Sala 76');
INSERT INTO `sala` VALUES ('58', '6', 'Sala 86');
INSERT INTO `sala` VALUES ('59', '6', 'Sala 96');
INSERT INTO `sala` VALUES ('60', '6', 'Sala 106');
INSERT INTO `sala` VALUES ('61', '7', 'Sala 17');
INSERT INTO `sala` VALUES ('62', '7', 'Sala 27');
INSERT INTO `sala` VALUES ('63', '7', 'Sala 37');
INSERT INTO `sala` VALUES ('64', '7', 'Sala 47');
INSERT INTO `sala` VALUES ('65', '7', 'Sala 57');
INSERT INTO `sala` VALUES ('66', '7', 'Sala 67');
INSERT INTO `sala` VALUES ('67', '7', 'Sala 77');
INSERT INTO `sala` VALUES ('68', '7', 'Sala 87');
INSERT INTO `sala` VALUES ('69', '7', 'Sala 97');
INSERT INTO `sala` VALUES ('70', '7', 'Sala 107');
INSERT INTO `sala` VALUES ('71', '8', 'Sala 18');
INSERT INTO `sala` VALUES ('72', '8', 'Sala 28');
INSERT INTO `sala` VALUES ('73', '8', 'Sala 38');
INSERT INTO `sala` VALUES ('74', '8', 'Sala 48');
INSERT INTO `sala` VALUES ('75', '8', 'Sala 58');
INSERT INTO `sala` VALUES ('76', '8', 'Sala 68');
INSERT INTO `sala` VALUES ('77', '8', 'Sala 78');
INSERT INTO `sala` VALUES ('78', '8', 'Sala 88');
INSERT INTO `sala` VALUES ('79', '8', 'Sala 98');
INSERT INTO `sala` VALUES ('80', '8', 'Sala 108');
INSERT INTO `sala` VALUES ('81', '9', 'Sala 19');
INSERT INTO `sala` VALUES ('82', '9', 'Sala 29');
INSERT INTO `sala` VALUES ('83', '9', 'Sala 39');
INSERT INTO `sala` VALUES ('84', '9', 'Sala 49');
INSERT INTO `sala` VALUES ('85', '9', 'Sala 59');
INSERT INTO `sala` VALUES ('86', '9', 'Sala 69');
INSERT INTO `sala` VALUES ('87', '9', 'Sala 79');
INSERT INTO `sala` VALUES ('88', '9', 'Sala 89');
INSERT INTO `sala` VALUES ('89', '9', 'Sala 99');
INSERT INTO `sala` VALUES ('90', '10', 'Sala 109');
INSERT INTO `sala` VALUES ('91', '10', 'Sala 110');
INSERT INTO `sala` VALUES ('92', '10', 'Sala 210');
INSERT INTO `sala` VALUES ('93', '10', 'Sala 310');
INSERT INTO `sala` VALUES ('94', '10', 'Sala 410');
INSERT INTO `sala` VALUES ('95', '10', 'Sala 510');
INSERT INTO `sala` VALUES ('96', '10', 'Sala 610');
INSERT INTO `sala` VALUES ('97', '10', 'Sala 710');
INSERT INTO `sala` VALUES ('98', '10', 'Sala 810');
INSERT INTO `sala` VALUES ('99', '10', 'Sala 910');
INSERT INTO `sala` VALUES ('100', '10', 'Sala 1010');
