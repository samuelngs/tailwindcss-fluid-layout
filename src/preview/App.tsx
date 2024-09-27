import { GridAreas } from './GridAreas';
import { GridLines } from './GridLines';
import './index.css';

export default function App() {
  return (
    <div className="grid h-screen">
      <GridAreas />
      <GridLines />
    </div>
  );
}
