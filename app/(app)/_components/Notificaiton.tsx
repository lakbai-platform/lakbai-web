'use client';

import { X } from 'lucide-react';

type NotificationType = 'delete-confirmation';

interface NotificationProps {
  type: NotificationType;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

interface NotificationConfig {
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  confirmLoadingLabel: string;
}

const notificationConfigs: Record<NotificationType, NotificationConfig> = {
  'delete-confirmation': {
    title: 'Delete chat?',
    description: 'This action cannot be undone',
    cancelLabel: 'Cancel',
    confirmLabel: 'Delete',
    confirmLoadingLabel: 'Deleting...'
  }
};

export default function Notification({
  type,
  isOpen,
  onCancel,
  onConfirm,
  isLoading = false
}: NotificationProps) {
  if (!isOpen) return null;

  const config = notificationConfigs[type];

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 z-50 bg-black/20 backdrop-blur-sm'
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className='fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl'>
        {/* Header */}
        <div className='border-border relative border-b px-6 py-4'>
          <h2 className='text-text-main text-lg font-semibold'>
            {config.title}
          </h2>
          <p className='text-text-muted mt-1 text-sm'>{config.description}</p>
          <button
            onClick={onCancel}
            className='hover:bg-surface absolute top-4 right-4 rounded-md p-1 transition-colors'
            disabled={isLoading}
          >
            <X size={20} className='text-text-muted' />
          </button>
        </div>

        {/* Footer with buttons */}
        <div className='flex gap-3 px-6 py-4'>
          <button
            onClick={onCancel}
            className='border-border text-text-main hover:bg-surface flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50'
            disabled={isLoading}
          >
            {config.cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className='bg-primary-500 hover:bg-primary-600 flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? config.confirmLoadingLabel : config.confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}

// Export for backward compatibility
export const DeleteConfirmationDialog = Notification;
