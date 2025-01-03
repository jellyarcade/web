'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <div className='flex items-center space-x-6 mb-6'>
          <div className='w-24 h-24 rounded-full overflow-hidden'>
            <img
              src={
                user.avatar ||
                'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
              }
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <h1 className='text-2xl font-bold'>Profil Bilgileri</h1>
            <p className='text-gray-600'>ID: {user.id}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='border-t pt-4'>
            <h2 className='text-lg font-semibold mb-2'>Rol</h2>
            <p className='text-gray-700'>{user.role}</p>
          </div>

          <div className='border-t pt-4'>
            <h2 className='text-lg font-semibold mb-2'>Hesap Durumu</h2>
            <div className='flex items-center'>
              <span className='inline-block w-2 h-2 rounded-full bg-green-500 mr-2'></span>
              <span className='text-gray-700'>Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
