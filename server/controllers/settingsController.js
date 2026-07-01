import Setting from '../models/Setting.js';

// @desc    Get settings
// @route   GET /api/v1/settings
// @access  Private
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update settings
// @route   PUT /api/v1/settings
// @access  Private
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      settings.storeName = req.body.storeName !== undefined ? req.body.storeName : settings.storeName;
      settings.supportEmail = req.body.supportEmail !== undefined ? req.body.supportEmail : settings.supportEmail;
      settings.currency = req.body.currency !== undefined ? req.body.currency : settings.currency;
      settings.taxRate = req.body.taxRate !== undefined ? req.body.taxRate : settings.taxRate;
      settings.enableNotifications = req.body.enableNotifications !== undefined ? req.body.enableNotifications : settings.enableNotifications;
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    next(error);
  }
};
