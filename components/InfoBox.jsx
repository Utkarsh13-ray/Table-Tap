const InfoBox = ({title, info}) => {
  return (
    <div className="w-1/4 flex">
      <div className="h-1/2 w-4/5 rounded-lg m-auto px-4 py-2 loginDiv">
        <h1 className="font-semibold text-base">{title}</h1>
        <h3 className="font-bold text-3xl">{info}</h3>
      </div>
    </div>
  );
};

export default InfoBox;
