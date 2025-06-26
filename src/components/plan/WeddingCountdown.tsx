import moment from "moment";

interface WeddingCountdownProps {
  date: Date;
}

const WeddingCountdown = ({ date }: WeddingCountdownProps) => {
  const duration = moment.duration(moment(date).diff(moment()));

  return (
    <div className="p-6 flex flex-col gap-1 items-center justify-center">
      <div className="flex flex-row items-center gap-6">
        <div className="p-10 border-neutral-300 border-1 shadow-md rounded-xl flex flex-row gap-2 items-center justify-center bg-slate-50">
          <h1 className="font-semibold text-3xl">
            {Math.floor(duration.asDays())}
          </h1>
          <div>
            <p className="font-light text-xs text-slate-500">Days</p>
            <p className="font-light text-xs text-slate-500">Left</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingCountdown;
