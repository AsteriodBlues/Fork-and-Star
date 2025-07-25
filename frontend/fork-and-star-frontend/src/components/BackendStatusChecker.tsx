"use client";

import { useState, useEffect } from 'react';
import { checkBackendConnection } from '@/utils/api';

interface BackendStatus {
  status: 'connected' | 'disconnected' | 'error' | 'checking';
  error?: string;
  data?: any;
}

export default function BackendStatusChecker() {
  const [status, setStatus] = useState<BackendStatus>({ status: 'checking' });
  const [lastChecked, setLastChecked] = useState<string>('');

  const checkStatus = async () => {
    setStatus({ status: 'checking' });
    const result = await checkBackendConnection();
    setStatus(result as BackendStatus);
    setLastChecked(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    checkStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status.status) {
      case 'connected': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'disconnected': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'error': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'checking': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusIcon = () => {
    switch (status.status) {
      case 'connected': return '✅';
      case 'disconnected': return '❌';
      case 'error': return '⚠️';
      case 'checking': return '🔄';
      default: return '❓';
    }
  };

  const getStatusMessage = () => {
    switch (status.status) {
      case 'connected': return 'Backend is running correctly';
      case 'disconnected': return 'Backend is not running';
      case 'error': return `Backend error: ${status.error}`;
      case 'checking': return 'Checking backend status...';
      default: return 'Unknown status';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-[100] p-4 rounded-xl border backdrop-blur-sm ${getStatusColor()}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{getStatusIcon()}</span>
        <div className="flex flex-col">
          <span className="font-medium">{getStatusMessage()}</span>
          {lastChecked && (
            <span className="text-xs opacity-70">Last checked: {lastChecked}</span>
          )}
        </div>
        <button
          onClick={checkStatus}
          className="ml-2 px-2 py-1 text-xs rounded border border-current/30 hover:bg-current/10 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      {status.status === 'disconnected' && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <div className="text-xs">
            <p className="font-medium mb-1">To start the backend:</p>
            <code className="block p-2 bg-black/20 rounded text-xs">
              cd backend/fork_and_star_backend<br/>
              python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
            </code>
          </div>
        </div>
      )}
      
      {status.data && (
        <div className="mt-2 pt-2 border-t border-current/20">
          <div className="text-xs">
            <strong>Backend Response:</strong>
            <pre className="mt-1 p-2 bg-black/20 rounded text-xs overflow-auto max-w-64">
              {JSON.stringify(status.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
