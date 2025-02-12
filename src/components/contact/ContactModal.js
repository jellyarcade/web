'use client';

import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';

// EmailJS'i initialize et
emailjs.init('vePXnXPXHMOqqRfjH');

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const t = useTranslations('contact');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await emailjs.send(
        'service_w9gzkfa',
        'template_cp6oldk',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'vePXnXPXHMOqqRfjH'
      );

      // Form başarıyla gönderildi
      setFormData({ name: '', email: '', message: '' });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      setError(t('sendError'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-lg rounded-lg shadow-xl'>
        {/* Header */}
        <div className='p-4 border-b flex justify-between items-center'>
          <h2 className='text-xl font-medium'>{t('title')}</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <IoClose className='w-6 h-6' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          {error && (
            <div className='p-3 bg-red-100 text-red-600 rounded-lg text-sm'>
              {error}
            </div>
          )}

          {success && (
            <div className='p-3 bg-green-100 text-green-600 rounded-lg text-sm'>
              {t('sendSuccess')}
            </div>
          )}

          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              {t('name')}
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 ring-brand-orange/50 outline-none'
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              {t('email')}
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 ring-brand-orange/50 outline-none'
            />
          </div>

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              {t('message')}
            </label>
            <textarea
              id='message'
              name='message'
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 ring-brand-orange/50 outline-none resize-none'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 px-4 bg-brand-orange text-white rounded-lg font-medium hover:bg-brand-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? t('sending') : t('send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
