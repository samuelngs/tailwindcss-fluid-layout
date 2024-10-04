import { GridLines } from './GridLines';
import { GridZones } from './GridZones';
import './index.css';

export default function App() {
  return (
    <div className="grid h-screen">
      <GridZones />
      <GridLines />
    </div>
  );
}
