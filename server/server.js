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
    const products = await Product.find({});
    console.log('All products fetched');
    res.send(products);
});

// API fro getting Exact Product
app.get('/product/:id', async (req, res) => {
    const product = await Product.findOne({id: req.params.id});
    console.log('Product fetched');
    res.send(product);
});