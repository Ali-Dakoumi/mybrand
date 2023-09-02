import axios from 'axios';
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function fetchFakeProducts( id = "") {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch fake products');
  }
}

const app = express();

// view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.render('index', { title: 'home!', id: "home", class: "home" });
});

app.get('/products', async (req, res) => {
  const products = await fetchFakeProducts()
  console.log("🚀 ~ file: index.js:34 ~ app.get ~ products:", products)
  res.render('products', { title: 'home!', id: "home", class: "home", products });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'about!', id: "about", class: "about" });
});

app.get('/product/:id', async (req, res) => {
  const {id} = req.params
  const product = await fetchFakeProducts(id)

  res.render('product', { title: 'about!', id: "about", class: "about", product });
});

app.listen(3000, () => {
  console.log('Express is running...');
});
