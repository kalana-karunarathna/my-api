const express = require('express');
const app = express();

app.use(express.json());

// 1. Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 2. Sum endpoint ?a=1&b=2
app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  res.json({ result: a + b });
});

// 3. Simple in-memory todo list
const todos = [];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a todo
app.post('/todos', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Todo text is required' });
  }

  const newTodo = { id: todos.length + 1, text };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

module.exports = app;
