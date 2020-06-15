export const megabytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  bytes *= 1048576;
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
};

export const megabytesToTerabytesGraph = (value) => (value/1048576).toFixed(2);

export const remainderPercentage = (value) => `${100 - value.split('%')[0]}%`;
