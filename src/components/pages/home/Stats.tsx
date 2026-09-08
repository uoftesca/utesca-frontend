import StatsCard from "./StatsCard";

const Stats: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto text-center space-y-6">
      <h1 className="text-2xl font-bold tracking-normal md:text-4xl text-primary pb-3">
        Fast Facts
      </h1>
      <div className="flex flex-col items-center gap-6">
        <div className="w-full grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Student Executives" num={80} text="" />
          <StatsCard title="Projects Completed" num={30} text="since 2020" />
          <StatsCard
            title="Engaged with"
            num={15}
            text="undergraduate and graduate disciplines"
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
