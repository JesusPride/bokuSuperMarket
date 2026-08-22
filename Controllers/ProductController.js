const Product = require('../Models/Product');

// const createProduct = async (req, res) =>  {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// module.exports = { createProduct };

// CREATE PRODUCT
exports.createProduct = async (req, res) =>  {
    try {
        const { name,size, description, price, category, imageUrl, quantity, color } = req.body;

        const product = new Product({
            name,
            size,
            description,
            price,
            category,
            imageUrl,
            quantity, 
            color
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};


//UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, size, description, price, category, imageUrl, quantity, color } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, category, imageUrl, quantity, color})
      
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
    }catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
    
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching products', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
    
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching product', error: error.message });
    }
};


