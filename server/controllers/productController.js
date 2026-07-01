import Product from '../models/Product.js';
import Setting from '../models/Setting.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
      
    const category = req.query.category ? { category: req.query.category } : {};
    const status = req.query.status ? { status: req.query.status } : {};

    const filter = { ...keyword, ...category, ...status };

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(req.query.sort || '-createdAt');

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: req.body.name || 'Sample Product',
      price: req.body.price || 0,
      user: req.user._id,
      createdBy: req.user._id,
      image: req.body.image || 'https://via.placeholder.com/150',
      category: req.body.category || 'Electronics',
      stock: req.body.stock || 0,
      description: req.body.description || 'Sample description',
      status: req.body.status || 'Active',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, category, stock, status } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const previousStock = product.stock;
      
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.status = status || product.status;

      const updatedProduct = await product.save();
      
      // Low stock alert logic
      if (previousStock >= 10 && updatedProduct.stock < 10) {
        const settings = await Setting.findOne();
        if (settings && settings.enableNotifications && settings.supportEmail) {
          sendEmail({
            email: settings.supportEmail,
            subject: `Low Stock Alert: ${updatedProduct.name}`,
            message: `
              <h2>Low Stock Alert</h2>
              <p>The stock for <strong>${updatedProduct.name}</strong> has dropped below 10.</p>
              <p>Current Stock Level: <strong style="color: red;">${updatedProduct.stock}</strong></p>
              <p>Please reorder this product soon to avoid stockouts.</p>
            `
          });
        }
      }

      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};
