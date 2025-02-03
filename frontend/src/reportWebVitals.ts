import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

type ReportHandler = (metric: {
  name: string;
  value: number;
  id: string;
}) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
