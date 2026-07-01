import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  storeName: {
    type: String,
    default: 'PrimePanel Store',
  },
  supportEmail: {
    type: String,
    default: 'support@example.com',
  },
  currency: {
    type: String,
    default: 'USD',
  },
  taxRate: {
    type: Number,
    default: 0,
  },
  enableNotifications: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
