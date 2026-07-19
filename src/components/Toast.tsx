/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, CheckCircle, Info, AlertTriangle, ShoppingBag, Heart } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 md:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: () => void; key?: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'cart':
        return <ShoppingBag className="w-5 h-5 text-amber-600" />;
      case 'wishlist':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    return 'bg-white border-zinc-200 shadow-xl';
  };

  return (
    <div
      id={`toast-${toast.id}`}
      className={`flex items-start gap-3 p-4 rounded-xl border pointer-events-auto transition-all duration-300 transform translate-y-0 animate-fade-in-up ${getBgColor()}`}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-grow">
        <h4 className="text-sm font-semibold text-zinc-900">{toast.title}</h4>
        <p className="text-xs text-zinc-500 mt-1">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full hover:bg-zinc-100 transition-colors"
        id={`close-toast-${toast.id}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
