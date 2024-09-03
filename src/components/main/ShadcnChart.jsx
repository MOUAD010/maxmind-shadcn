import SimpleChart from "./charts/SimpleChart";
import BarCharts from "./charts/BarCharts";

export default function ShadcnChart() {
  return (
    <div className="w-full h-full flex justify-center my-2  gap-2 ">
      <div className="w-[450px]">
        <SimpleChart />
      </div>
      <div className="">
        <div className="mb-4">
          <BarCharts />
        </div>
        <div className="">
          <BarCharts />
        </div>
      </div>
    </div>
  );
}
