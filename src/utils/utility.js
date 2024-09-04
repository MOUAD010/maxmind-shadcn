// utility.js
import html2canvas from "html2canvas";

export const handleDownloadPdf = async (
  chartRef,
  setChartImage,
  setLoading,
  setPdfPrepared
) => {
  setLoading(true);

  if (chartRef.current) {
    const canvas = await html2canvas(chartRef.current, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      logging: false,
      imageTimeout: 15000,
    });

    const imgData = canvas.toDataURL("image/png");
    setChartImage(imgData);
  }

  setLoading(false);
  setPdfPrepared(true);
};
