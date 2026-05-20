import { Button } from './Button'

export const Modal = ({ 
  isOpen, 
  title, 
  children, 
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'dialog', // 'dialog' | 'confirm'
  loading = false
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {title && (
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          </div>
        )}
        
        <div className="px-6 py-4">
          {children}
        </div>

        <div className="border-t px-6 py-4 flex gap-3 justify-end">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          {type === 'confirm' && (
            <Button 
              variant={type === 'confirm' ? 'danger' : 'primary'}
              size="sm"
              onClick={onConfirm}
              loading={loading}
              disabled={loading}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
