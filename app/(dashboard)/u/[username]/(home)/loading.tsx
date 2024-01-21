import { StreamPlayerSkeleton } from '@/components/stream-player';
import React from 'react'

const DashboardLoading = () => {
  return (
    <div className="h-full">
        <StreamPlayerSkeleton />
    </div>
  );
};

export default DashboardLoading;
