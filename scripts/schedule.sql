-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: schedule
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Agendamento`
--

DROP TABLE IF EXISTS `Agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Agendamento` (
  `IdAgendamento` int NOT NULL AUTO_INCREMENT,
  `DataAgendamento` date DEFAULT NULL,
  `HoraAgendamento` time(6) DEFAULT NULL,
  `IdConvenio` int NOT NULL,
  `IdPessoa` int DEFAULT NULL,
  `IdEspecialista` int DEFAULT NULL,
  PRIMARY KEY (`IdAgendamento`),
  KEY `FK_Agendamento_0` (`IdConvenio`),
  KEY `FK_Agendamento_1` (`IdPessoa`),
  KEY `FK_Agendamento_2` (`IdEspecialista`),
  CONSTRAINT `FK_Agendamento_0` FOREIGN KEY (`IdConvenio`) REFERENCES `Convenio` (`IdConvenio`),
  CONSTRAINT `FK_Agendamento_1` FOREIGN KEY (`IdPessoa`) REFERENCES `Pessoa` (`IdPessoa`),
  CONSTRAINT `FK_Agendamento_2` FOREIGN KEY (`IdEspecialista`) REFERENCES `Especialista` (`IdEspecialista`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Agendamento`
--

LOCK TABLES `Agendamento` WRITE;
/*!40000 ALTER TABLE `Agendamento` DISABLE KEYS */;
INSERT INTO `Agendamento` VALUES (1,'2021-05-27','10:58:00.000000',1,3,1),(2,'2021-05-27','10:58:00.000000',1,3,1);
/*!40000 ALTER TABLE `Agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cidade`
--

DROP TABLE IF EXISTS `Cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cidade` (
  `IdCidade` int NOT NULL AUTO_INCREMENT,
  `Cidade` varchar(100) DEFAULT NULL,
  `UF` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`IdCidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cidade`
--

LOCK TABLES `Cidade` WRITE;
/*!40000 ALTER TABLE `Cidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Consulta`
--

DROP TABLE IF EXISTS `Consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Consulta` (
  `IdConsulta` int NOT NULL AUTO_INCREMENT,
  `DataConsulta` date DEFAULT NULL,
  `HoraConsulta` time(6) DEFAULT NULL,
  `Peso` varchar(100) DEFAULT NULL,
  `Altura` varchar(100) DEFAULT NULL,
  `IMC` varchar(100) DEFAULT NULL,
  `DiagnosticoClinico` varchar(200) DEFAULT NULL,
  `IdPessoa` int DEFAULT NULL,
  `IdAgendamento` int DEFAULT NULL,
  `IdEspecialista` int DEFAULT NULL,
  PRIMARY KEY (`IdConsulta`),
  KEY `FK_Consulta_0` (`IdPessoa`),
  KEY `FK_Consulta_1` (`IdAgendamento`),
  KEY `FK_Consulta_2` (`IdEspecialista`),
  CONSTRAINT `FK_Consulta_0` FOREIGN KEY (`IdPessoa`) REFERENCES `Pessoa` (`IdPessoa`),
  CONSTRAINT `FK_Consulta_1` FOREIGN KEY (`IdAgendamento`) REFERENCES `Agendamento` (`IdAgendamento`),
  CONSTRAINT `FK_Consulta_2` FOREIGN KEY (`IdEspecialista`) REFERENCES `Especialista` (`IdEspecialista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Consulta`
--

LOCK TABLES `Consulta` WRITE;
/*!40000 ALTER TABLE `Consulta` DISABLE KEYS */;
/*!40000 ALTER TABLE `Consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contato`
--

DROP TABLE IF EXISTS `Contato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contato` (
  `IdContato` int NOT NULL AUTO_INCREMENT,
  `DDD` varchar(10) DEFAULT NULL,
  `NumeroTelefone` varchar(50) DEFAULT NULL,
  `TipoTelefone` varchar(50) DEFAULT NULL,
  `IdPessoa` int DEFAULT NULL,
  PRIMARY KEY (`IdContato`),
  KEY `FK_Contato_0` (`IdPessoa`),
  CONSTRAINT `FK_Contato_0` FOREIGN KEY (`IdPessoa`) REFERENCES `Pessoa` (`IdPessoa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contato`
--

LOCK TABLES `Contato` WRITE;
/*!40000 ALTER TABLE `Contato` DISABLE KEYS */;
/*!40000 ALTER TABLE `Contato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Convenio`
--

DROP TABLE IF EXISTS `Convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Convenio` (
  `IdConvenio` int NOT NULL AUTO_INCREMENT,
  `NomeConvenio` varchar(100) DEFAULT NULL,
  `DescricaoConvenio` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdConvenio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Convenio`
--

LOCK TABLES `Convenio` WRITE;
/*!40000 ALTER TABLE `Convenio` DISABLE KEYS */;
INSERT INTO `Convenio` VALUES (1,'ITAMED','conv');
/*!40000 ALTER TABLE `Convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enderecos`
--

DROP TABLE IF EXISTS `Enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Enderecos` (
  `IdEndereco` int NOT NULL AUTO_INCREMENT,
  `Logradouro` varchar(100) DEFAULT NULL,
  `Numero` varchar(10) DEFAULT NULL,
  `Bairro` varchar(100) DEFAULT NULL,
  `Complemento` varchar(100) DEFAULT NULL,
  `CEP` varchar(50) DEFAULT NULL,
  `TipoEndereco` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdEndereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enderecos`
--

LOCK TABLES `Enderecos` WRITE;
/*!40000 ALTER TABLE `Enderecos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Especialista`
--

DROP TABLE IF EXISTS `Especialista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Especialista` (
  `IdEspecialista` int NOT NULL AUTO_INCREMENT,
  `Especialidade` varchar(100) DEFAULT NULL,
  `CRMEspecialista` varchar(100) DEFAULT NULL,
  `IdPessoa` int DEFAULT NULL,
  PRIMARY KEY (`IdEspecialista`),
  KEY `FK_Especialista_0` (`IdPessoa`),
  CONSTRAINT `FK_Especialista_0` FOREIGN KEY (`IdPessoa`) REFERENCES `Pessoa` (`IdPessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Especialista`
--

LOCK TABLES `Especialista` WRITE;
/*!40000 ALTER TABLE `Especialista` DISABLE KEYS */;
INSERT INTO `Especialista` VALUES (1,'Acupuntura','Acupuntura',2);
/*!40000 ALTER TABLE `Especialista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pessoa`
--

DROP TABLE IF EXISTS `Pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pessoa` (
  `IdPessoa` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT NULL,
  `DataNascimento` varchar(50) DEFAULT NULL,
  `RG` varchar(100) DEFAULT NULL,
  `Sexo` varchar(100) DEFAULT NULL,
  `CPF` varchar(50) DEFAULT NULL,
  `Naturalidade` varchar(100) DEFAULT NULL,
  `ProfissaoAtual` varchar(100) DEFAULT NULL,
  `ProfissaoAnterior` varchar(100) DEFAULT NULL,
  `EstadoCivil` varchar(100) DEFAULT NULL,
  `Escolaridade` varchar(100) DEFAULT NULL,
  `ContatoEmergencial` varchar(100) DEFAULT NULL,
  `GrauParentesco` varchar(100) DEFAULT NULL,
  `Nacionalidade` varchar(100) DEFAULT NULL,
  `TipoPessoa` varchar(100) DEFAULT NULL,
  `IdEndereco` int DEFAULT NULL,
  `IdCidade` int DEFAULT NULL,
  PRIMARY KEY (`IdPessoa`),
  KEY `FK_Pessoa_0` (`IdEndereco`),
  KEY `FK_Pessoa_1` (`IdCidade`),
  CONSTRAINT `FK_Pessoa_0` FOREIGN KEY (`IdEndereco`) REFERENCES `Enderecos` (`IdEndereco`),
  CONSTRAINT `FK_Pessoa_1` FOREIGN KEY (`IdCidade`) REFERENCES `Cidade` (`IdCidade`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pessoa`
--

LOCK TABLES `Pessoa` WRITE;
/*!40000 ALTER TABLE `Pessoa` DISABLE KEYS */;
INSERT INTO `Pessoa` VALUES (1,'Marcos','2020-11-18T15:51:07.841-00:00','1231','m','123123','123123','ggg','as','solteiro','tess','gas','yyyy','teste','Funcionario',NULL,NULL),(2,'Paulo','2020-11-18T15:51:07.841-00:00','1231','m','123123','123123','ggg','as','solteiro','tess','gas','yyyy','teste','Fisioterapeuta',NULL,NULL),(3,'Rodrigo','2020-11-27T17:01:24.506-00:00','123','m','123qwe','12123','123','123','Divorciado','Ensino Superior','123','Primo','123','Paciente',NULL,NULL);
/*!40000 ALTER TABLE `Pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Procedimento`
--

DROP TABLE IF EXISTS `Procedimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Procedimento` (
  `IdProcedimento` int NOT NULL AUTO_INCREMENT,
  `DataProcedimento` date DEFAULT NULL,
  `HoraProcedimento` time(6) DEFAULT NULL,
  `IdPessoa` int DEFAULT NULL,
  `IdConvenio` int DEFAULT NULL,
  `IdTipoProcedimento` int DEFAULT NULL,
  `IdConsulta` int DEFAULT NULL,
  `IdEspecialista` int DEFAULT NULL,
  PRIMARY KEY (`IdProcedimento`),
  KEY `FK_Procedimento_0` (`IdPessoa`),
  KEY `FK_Procedimento_1` (`IdConvenio`),
  KEY `FK_Procedimento_2` (`IdTipoProcedimento`),
  KEY `FK_Procedimento_3` (`IdConsulta`),
  KEY `FK_Procedimento_4` (`IdEspecialista`),
  CONSTRAINT `FK_Procedimento_0` FOREIGN KEY (`IdPessoa`) REFERENCES `Pessoa` (`IdPessoa`),
  CONSTRAINT `FK_Procedimento_1` FOREIGN KEY (`IdConvenio`) REFERENCES `Convenio` (`IdConvenio`),
  CONSTRAINT `FK_Procedimento_2` FOREIGN KEY (`IdTipoProcedimento`) REFERENCES `TipoProcedimento` (`IdTipoProcedimento`),
  CONSTRAINT `FK_Procedimento_3` FOREIGN KEY (`IdConsulta`) REFERENCES `Consulta` (`IdConsulta`),
  CONSTRAINT `FK_Procedimento_4` FOREIGN KEY (`IdEspecialista`) REFERENCES `Especialista` (`IdEspecialista`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Procedimento`
--

LOCK TABLES `Procedimento` WRITE;
/*!40000 ALTER TABLE `Procedimento` DISABLE KEYS */;
INSERT INTO `Procedimento` VALUES (1,'2020-11-27','02:02:00.000000',3,1,2,NULL,1),(2,'2020-11-27','06:40:00.000000',NULL,1,1,NULL,1),(3,'2020-11-27','09:42:00.000000',3,1,2,NULL,1),(4,'2020-11-27','20:50:00.000000',3,1,1,NULL,1),(5,'2020-11-28','14:57:00.000000',3,1,2,NULL,1);
/*!40000 ALTER TABLE `Procedimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoProcedimento`
--

DROP TABLE IF EXISTS `TipoProcedimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoProcedimento` (
  `IdTipoProcedimento` int NOT NULL AUTO_INCREMENT,
  `DescricaoTipoProcedimento` char(10) DEFAULT NULL,
  PRIMARY KEY (`IdTipoProcedimento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoProcedimento`
--

LOCK TABLES `TipoProcedimento` WRITE;
/*!40000 ALTER TABLE `TipoProcedimento` DISABLE KEYS */;
INSERT INTO `TipoProcedimento` VALUES (1,'Exame'),(2,'Coleta');
/*!40000 ALTER TABLE `TipoProcedimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `IdUsuario` int NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(100) DEFAULT NULL,
  `Senha` varchar(100) DEFAULT NULL,
  `IdPessoa` int DEFAULT NULL,
  PRIMARY KEY (`IdUsuario`),
  KEY `FK_Usuario_0` (`IdPessoa`),
  CONSTRAINT `FK_Usuario_0` FOREIGN KEY (`IdPessoa`) REFERENCES `Pessoa` (`IdPessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'admin','admin',1),(2,'Paulo','123',2),(3,'Rodrigo','123',3);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-27 11:19:07
