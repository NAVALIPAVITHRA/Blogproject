const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const posts = []; // Define and initialize the posts array

app.get('/', (req, res) => {
  res.render('index', { posts: posts }); // Pass posts array to the view
});

app.get('/new-post', (req, res) => {
  res.render('new-post');
});

app.post('/new-post', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

app.get('/edit-post/:index', (req, res) => {
  const index = req.params.index;
  res.render('edit-post', { post: posts[index], index: index });
});

app.post('/edit-post/:index', (req, res) => {
  const index = req.params.index;
  const { title, content } = req.body;
  posts[index] = { title, content };
  res.redirect('/');
});

app.post('/delete-post/:index', (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

  
