const port = 3030;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect('mongodb+srv://test-user:test-user@react-final-project.dh35a7p.mongodb.net/react-final-project');

// API Creation
app.get('/', (req, res) => {
    res.send('Express App is running');
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port ${port}\nhttp://localhost:${port}/`);
    } else {
        console.log(`Error: ${error}`);
    }
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (res, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage: storage});

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        imageUrl: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Schema for Creating Products
const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/add-product', async (req, res) => {
    let products = await Product.find({});
    let id;
    
    if (products.length > 0) {
        let lastProduct = products.slice(-1)[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        newPrice: req.body.newPrice,
        oldPrice: req.body.oldPrice,
    });
    console.log(product);
    await product.save();
    console.log('Saved');
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Schema for Updating Products
app.put('/update-product/:id', async (req, res) => {
    await Product.findOneAndUpdate(
        { id: req.params.id },
        {
            $set: {
                name: req.body.name,
                image: req.body.image,
                category: req.body.category,
                newPrice: req.body.newPrice,
                oldPrice: req.body.oldPrice,
            }
        },
        { new: true }
    );
    console.log('Product Updated');
    res.json({
        success: true, 
        name: req.body.name,
    });
});

// Schema for Deleting Products
app.delete('/remove-product/:id', async (req, res) => {
    await Product.findOneAndDelete({id: req.params.id});
    console.log('Removed');
    res.json({
        success: true,
        name: req.body.name,
    });
});

// API for getting All Products
app.get('/all-products', async (req, res) => {
    // Add Sorting logic
    const sortOption = req.query.sort || 'id-asc';

    const sortCriteria = sortOption === 'newPrice-desc'
        ? { newPrice: -1 } 
        : sortOption === 'id-desc'
        ? { _id: -1 } 
        : sortOption === 'newPrice-asc'
        ? { newPrice: 1 } 
        : { _id: 1 }; 

    const products = await Product.find({}).sort(sortCriteria);
    console.log('All products fetched');
    res.send(products);
});

// API fro getting Exact Product
app.get('/product/:id', async (req, res) => {
    const product = await Product.findOne({id: req.params.id});
    console.log('Product fetched');
    res.send(product);
});

// Schema for creating User model
const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    agree: { 
        type: Boolean,
        required: true, 
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Create Endpoint for logging as Admin
const admins = {
    'admin1@gmail.com': 'admin_pass',
    'admin2@gmail.com': 'admin_1234',
};

app.post('/admin-login', (req, res) => {
    const { email, password } = req.body;

    if (admins[email] && admins[email] === password) {
         return res.status(200).json({
            message: 'Login successful', 
        });
    } 

    res.json({ 
        message: 'Invalid email or password',
    });
});

// Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
    const check = await Users.findOne({email: req.body.email});

    if (check) {
        return res.status(400).json({
            success: false,
            errors: 'User with such email already exists',
        });
    }

    const cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0
    }

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        agree: req.body.agree,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true,
        token,
    });
});

// Creating Endpoint for users login
app.post('/login', async (req, res) => {
    const user = await Users.findOne({email: req.body.email});

    if (user) {
        const passCompare = req.body.password === user.password;

        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            }

            const token = jwt.sign(data, 'secret_ecom');
            res.json({
                success: true,
                token,
            })
        } else {
            res.json({
                success: false,
                errors: 'Wrong Password',
            })
        }
    } else {
        res.json({
            success: false,
            errors: 'Wrong Email',
        })
    }
});

// Creating Endpoint for newest collection data
app.get('/new-collection', async (req, res) => {
    const products = await Product.find({});
    const newCollection = products.slice(1).slice(-8);
    console.log('New Collection fetched');
    res.send(newCollection);
});

// Creating Endpoint for popular in women category
app.get('/popular-in-women' , async (req, res) => {
    const products = await Product.find({category: 'women'});
    const popular = products.slice(0, 4);
    console.log('Popular in women fetched');
    res.send(popular);
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ errors: 'Please authenticate using a valid token' });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).send({ errors: 'Please authenticate using a valid token' });
    }
}

// Creating Endpoint for adding products in cart
app.post('/add-to-cart', fetchUser, async (req, res) => {
    console.log('Added', req.body.itemId);

    const userData = await Users.findOne({_id: req.user.id});

    if (!userData) {
        return res.status(404).send({error: 'User not found'});
    }

    if (!userData.cartData) {
        userData.cartData = {};
    }

    userData.cartData[req.body.itemId]++;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send('Added to cart');
});

// Creating Endpoint for removing products from cart
app.post('/remove-from-cart', fetchUser, async (req, res) => {
    console.log('Removed', req.body.itemId);

    const userData = await Users.findOne({_id: req.user.id});

    if (!userData) {
        return res.status(404).send({error: 'User not found'});
    }

    if (!userData.cartData || !userData.cartData[req.body.itemId]) {
        return res.status(400).send({error: 'Item not in cart'});
    }

    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId]--;
    }

    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send('Removed from cart');
});

// Creating Endpoint for getting cart data
app.post('/get-cart', fetchUser, async (req, res) => {
    console.log('Get Cart data');

    const userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
});