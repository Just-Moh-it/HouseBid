const getColoredTime = (timeString) => {
  const times = timeString.split(":");

  return (
    <span>
      {times[0]}
      <span className="small text-secondary">H :</span>
      {times[1]}
      <span className="small text-secondary">M :</span>
      {times[2]}
      <span className="small text-secondary">S </span>
    </span>
  );
};

export default getColoredTime;
