import * as FileSystem from 'expo-file-system/legacy';

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  if (!bytes && bytes !== 0) return '—';

  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

export const getStorageInfo = async () => {
  const free = await FileSystem.getFreeDiskStorageAsync();
  const total = await FileSystem.getTotalDiskCapacityAsync();

  return {
    free,
    total,
    used: total - free,
  };
};