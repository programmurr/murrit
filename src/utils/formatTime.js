import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const formatTime = (data) => {
  const formattedTime = formatDistanceToNow(data.time, { addSuffix: true });
  return formattedTime;
}

export default formatTime;