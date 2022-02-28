const Timer = (props) => {
  const { minutes, seconds } = props;

  return (
    <div className='text-lg md:text-2xl md:mb-2'>
      {minutes === 0 && seconds === 0 ? null : (
        <h1>
          {minutes}
          {' : '}
          {seconds < 10 ? `0${seconds}` : seconds} {'Remaining '}
        </h1>
      )}
    </div>
  );
};

export default Timer;
