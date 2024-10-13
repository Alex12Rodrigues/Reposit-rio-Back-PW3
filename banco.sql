create database bd_loja;
use bd_loja;

INSERT INTO tbl_tamanhos (tamanho_escolhido, createdAt, updatedAt) VALUES ('P', now(), now());
INSERT INTO tbl_tamanhos (tamanho_escolhido, createdAt, updatedAt) VALUES ('M', now(), now());
INSERT INTO tbl_tamanhos (tamanho_escolhido, createdAt, updatedAt) VALUES ('G', now(), now());
INSERT INTO tbl_tamanhos (tamanho_escolhido, createdAt, updatedAt) VALUES ('GG', now(), now());
INSERT INTO tbl_tamanhos (tamanho_escolhido, createdAt, updatedAt) VALUES ('Outro', now(), now());


drop database bd_loja;

select *from tbl_tamanhos;

select *from tbl_pedidos;