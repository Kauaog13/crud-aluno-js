require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// [GET] Listar todos os alunos
app.get('/alunos', (req, res) => {
    db.query('SELECT * FROM alunos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// [GET] Buscar aluno por cod
app.get('/alunos/:cod', (req, res) => {
    const { cod } = req.params;
    db.query('SELECT * FROM alunos WHERE cod = ?', [cod], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0] || {});
    });
});

// [POST] Criar novo aluno
app.post('/alunos', (req, res) => {
    const { nome, cidade, uf, data } = req.body;
    db.query(
        'INSERT INTO alunos (nome, cidade, uf, data) VALUES (?, ?, ?, ?)',
        [nome, cidade, uf, data],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, ...req.body });
        }
    );
});

// [PUT] Atualizar aluno
app.put('/alunos/:cod', (req, res) => {
    const { cod } = req.params;
    const { nome, cidade, uf, data } = req.body;
    db.query(
        'UPDATE alunos SET nome = ?, cidade = ?, uf = ?, data = ? WHERE cod = ?',
        [nome, cidade, uf, data, cod],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ cod, ...req.body });
        }
    );
});

// [DELETE] Deletar aluno
app.delete('/alunos/:cod', (req, res) => {
    const { cod } = req.params;
    db.query('DELETE FROM alunos WHERE cod = ?', [cod], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Aluno removido com sucesso.' });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
