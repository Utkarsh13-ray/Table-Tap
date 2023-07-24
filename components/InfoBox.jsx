const InfoBox = ({title, info}) => {
  return (
    <div className=" w-3/4 lg:w-1/4 flex h-36">
      <div className="lg:h-1/2 h-3/4 w-4/5 rounded-lg lg:m-auto px-4 py-2 loginDiv">
        <h1 className="font-semibold text-base">{title}</h1>
        <h3 className="font-bold text-3xl">{info}</h3>
      </div>
    </div>
  );
};

export default InfoBox;
