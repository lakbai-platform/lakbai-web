import {
  Bookmark,
  Gift,
  Luggage,
  MapPin,
  MapPinHouse,
  MoreHorizontal,
  Star
} from 'lucide-react';

const profile = {
  name: 'Johann Reuel Buere',
  username: '@johnnreuel-buere',
  following: 0,
  followers: 0,
  location: 'Legazpi, Philippines'
};

const tabs = [
  { label: 'Journeys', count: 0, icon: Luggage, active: true },
  { label: 'Favorites', count: 0, icon: Bookmark, active: false },
  { label: 'Reviews', count: 0, icon: Star, active: false },
  { label: 'Contributions', count: 0, icon: MapPinHouse, active: false }
];

export default function ProfilePage() {
  return (
    <div className='bg-surface text-text-main h-full w-full overflow-y-auto'>
      <div className='mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 py-8 sm:px-8'>
        <section className='flex flex-col gap-6 sm:gap-8'>
          <div className='flex w-full flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
            <div className='flex items-start gap-4 sm:gap-6'>
              <div className='from-primary-400 via-secondary-400 to-primary-300 relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br p-0.5 sm:h-24 sm:w-24'>
                <div className='bg-surface text-text-main flex h-full w-full items-center justify-center rounded-full text-xl font-bold'>
                  JB
                </div>
              </div>

              <div className='space-y-2'>
                <div>
                  <h1 className='text-text-main text-xl leading-tight font-semibold sm:text-3xl'>
                    {profile.name}
                  </h1>
                  <p className='text-text-muted text-sm sm:text-base'>
                    {profile.username}
                  </p>
                </div>

                <p className='text-text-main text-sm sm:text-xl'>
                  <span className='font-semibold'>{profile.following}</span>{' '}
                  following{' '}
                  <span className='font-semibold'>{profile.followers}</span>{' '}
                  followers
                </p>

                <div className='text-text-muted flex items-center gap-2 text-sm sm:text-xl'>
                  <MapPin className='h-4 w-4 sm:h-5 sm:w-5' />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <button
              type='button'
              aria-label='Profile options'
              className='border-border bg-background text-text-main hover:bg-surface-light self-end rounded-full border p-2.5 transition sm:self-start'
            >
              <MoreHorizontal className='h-4 w-4' />
            </button>
          </div>

          <div className='border-border border-b'>
            <nav className='flex flex-wrap items-center gap-6 pb-3 sm:justify-center sm:gap-8'>
              {tabs.map(tab => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.label}
                    type='button'
                    className={`group relative inline-flex items-center gap-2 text-sm transition sm:text-lg ${
                      tab.active
                        ? 'text-text-main'
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    <Icon className='h-4 w-4 sm:h-5 sm:w-5' />
                    <span>{tab.label}</span>
                    <span>{tab.count}</span>

                    {tab.active && (
                      <span className='bg-primary-500 absolute -bottom-3.25 left-0 h-0.5 w-full rounded-full' />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        <section className='flex flex-1 items-center justify-center py-14'>
          <div className='flex max-w-xl flex-col items-center text-center'>
            <div className='from-primary-100 via-secondary-100 to-primary-200 mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br shadow-[0_20px_40px_rgba(2,128,144,0.22)]'>
              <Gift className='text-primary-700 h-8 w-8' />
            </div>

            <h2 className='text-text-main text-2xl font-semibold sm:text-3xl'>
              No public journeys yet? Let&apos;s fix that.
            </h2>
            <p className='text-text-muted mt-3 text-base sm:text-xl'>
              Start your first journey and share it with the community.
            </p>

            <button
              type='button'
              className='bg-primary-500 hover:bg-primary-600 mt-8 rounded-full px-8 py-3 text-sm font-semibold text-white transition sm:text-lg'
            >
              View all
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
