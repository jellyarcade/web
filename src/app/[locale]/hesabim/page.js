'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ProfilePage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const t = useTranslations('profile');
  const locale = useLocale();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // Kullanıcı bilgilerini getir
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `http://localhost:5001/api/users/profile?lang=${locale}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Kullanıcı bilgileri alınamadı');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Kullanıcı bilgileri getirme hatası:', error);
      }
    };

    fetchUserData();
  }, [token, locale]);

  // İngilizce için account sayfasına yönlendir
  useEffect(() => {
    if (locale === 'en') {
      router.replace('/en/account');
    }
  }, [locale, router]);

  // Snackbar göster
  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => {
      setSnackbar({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Avatar değiştirme
  const handleAvatarChange = async event => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/users/avatar', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Avatar güncellenemedi');
      }

      const updatedUser = await response.json();
      // AuthContext'teki user state'ini ve userData'yı güncelle
      if (user) {
        user.avatar = updatedUser.avatar;
      }
      setUserData(prevData => ({
        ...prevData,
        avatar: updatedUser.avatar,
      }));
      showSnackbar(t('avatarUpdated'));
    } catch (error) {
      console.error('Avatar güncelleme hatası:', error);
      showSnackbar(t('avatarError'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Şifre değiştirme
  const handlePasswordChange = async e => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showSnackbar(t('passwordsDoNotMatch'), 'error');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/users/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Şifre güncellenemedi');
      }

      showSnackbar(t('passwordUpdated'));
      setShowPasswordModal(false);
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      showSnackbar(t('passwordError'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !userData) {
    return null;
  }

  return (
    <div className='container mx-auto mt-24 px-4 py-8'>
      {/* Snackbar */}
      {snackbar.show && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transition-all transform ${
            snackbar.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {snackbar.message}
        </div>
      )}

      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <div className='flex items-center space-x-6 mb-6'>
          {/* Avatar with hover effect */}
          <div className='relative w-24 h-24 group'>
            <div className='w-24 h-24 rounded-full overflow-hidden'>
              <img
                src={
                  userData.avatar ||
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                }
                alt={t('profilePicture')}
                className='w-full h-full object-cover'
              />
            </div>
            <div
              className='absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer'
              onClick={() => fileInputRef.current?.click()}
            >
              <span className='text-white text-sm text-center px-2'>
                {t('changeAvatar')}
              </span>
            </div>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept='image/*'
              className='hidden'
            />
          </div>
          <div>
            <h1 className='text-2xl font-bold'>{t('title')}</h1>
            <p className='text-gray-600'>ID: {userData.id}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='border-t pt-4'>
            <h2 className='text-lg font-semibold mb-2'>{t('accountStatus')}</h2>
            <div className='flex items-center'>
              <span className='inline-block w-2 h-2 rounded-full bg-green-500 mr-2'></span>
              <span className='text-gray-700'>{t('active')}</span>
            </div>
          </div>

          <div className='border-t pt-4'>
            <button
              onClick={() => setShowPasswordModal(true)}
              className='bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-orange/90 transition-colors'
              disabled={isLoading}
            >
              {t('changePassword')}
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <h2 className='text-xl font-bold mb-4'>{t('changePassword')}</h2>
            <form onSubmit={handlePasswordChange} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {t('oldPassword')}
                </label>
                <input
                  type='password'
                  value={passwordForm.oldPassword}
                  onChange={e =>
                    setPasswordForm({
                      ...passwordForm,
                      oldPassword: e.target.value,
                    })
                  }
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {t('newPassword')}
                </label>
                <input
                  type='password'
                  value={passwordForm.newPassword}
                  onChange={e =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {t('confirmPassword')}
                </label>
                <input
                  type='password'
                  value={passwordForm.confirmPassword}
                  onChange={e =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange'
                  required
                />
              </div>
              <div className='flex justify-end space-x-3 mt-6'>
                <button
                  type='button'
                  onClick={() => setShowPasswordModal(false)}
                  className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'
                  disabled={isLoading}
                >
                  {t('cancel')}
                </button>
                <button
                  type='submit'
                  className='bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-orange/90 transition-colors'
                  disabled={isLoading}
                >
                  {isLoading ? t('updating') : t('update')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
