import FretBoard from './component/FretBoard';
import NotePad from './component/NotePad';
export default function LearnTheFretBoard() {
  return (
    <div className="bg-slate-500 h-screen">
      <h1 className="text-5xl text-center py-8">Learn The Fret Board</h1>
      <FretBoard />
      <NotePad />
    </div>
  );
}
