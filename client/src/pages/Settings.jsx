import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    storeName: '',
    supportEmail: '',
    currency: 'USD',
    taxRate: 0,
    enableNotifications: true,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/settings');
      setSettings(res.data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/settings', settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Configure your store preferences and global settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">General Details</h3>
            <p className="text-sm text-slate-500 mb-4">Basic information about your store.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Store Name" 
                name="storeName" 
                value={settings.storeName} 
                onChange={handleChange} 
                placeholder="e.g. PrimePanel Store" 
              />
              <Input 
                label="Support Email" 
                name="supportEmail" 
                type="email" 
                value={settings.supportEmail} 
                onChange={handleChange} 
                placeholder="support@example.com" 
              />
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Financial Settings</h3>
            <p className="text-sm text-slate-500 mb-4">Set your default currency and tax preferences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Currency</label>
                <select 
                  name="currency" 
                  value={settings.currency} 
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
              <Input 
                label="Default Tax Rate (%)" 
                name="taxRate" 
                type="number" 
                min="0" 
                max="100" 
                step="0.1" 
                value={settings.taxRate} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">System</h3>
            <p className="text-sm text-slate-500 mb-4">Manage system level preferences.</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  name="enableNotifications" 
                  className="sr-only" 
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${settings.enableNotifications ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.enableNotifications ? 'translate-x-4' : ''}`}></div>
              </div>
              <div className="text-sm font-medium text-slate-700">Enable Email Notifications</div>
            </label>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={fetchSettings} disabled={saving}>Discard Changes</Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
