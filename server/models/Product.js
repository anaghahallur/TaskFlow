import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be positive'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['Electronics', 'Accessories', 'Audio', 'Gaming', 'Software', 'Other'],
  },
  stock: {
    type: Number,
    required: [true, 'Please specify stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Archived'],
    default: 'Active',
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
