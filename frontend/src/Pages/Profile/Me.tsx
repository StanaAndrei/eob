import React from 'react';
import useAuthStore from '../../stores/auth.store';
import { Navigate } from 'react-router-dom';

export default function Me(): ReturnType<React.FC> {
  const getTokData = useAuthStore(state => state.getTokData);
  return <Navigate to={`/profile/${getTokData()?.id}`} />;
}