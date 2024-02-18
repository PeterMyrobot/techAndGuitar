'use client';

import { useState } from 'react';
import FretBoard, { TNote, getNote } from './component/FretBoard';
import NotePad from './component/NotePad';

export default function LearnTheFretBoard() {
  const fretAmount = 15;
  const stringTuning = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();
  const [quiz, setQuiz] = useState<TNote>();
  const generateQuiz = (): TNote => {
    // generate random number between 0 and 5
    const stringIdx = Math.floor(Math.random() * stringTuning.length);
    const fretIdx = Math.floor(Math.random() * fretAmount);

    return { string: stringIdx, fret: fretIdx, color: 'bg-rose-500', showingNote: false };
  };

  const generateNextQuiz = () => {
    setQuiz(generateQuiz());
  };

  const answerClick = (note: string) => {
    if (!quiz) return;
    const { fret, string } = quiz;
    console.log(getNote(string, fret, stringTuning), note);
    if (note === getNote(string, fret, stringTuning)) {
      setQuiz({ ...quiz, showingNote: true, color: 'bg-sky-500' });
      setTimeout(() => {
        generateNextQuiz();
      }, 1000);
    } else {
      alert('Stupid!');
    }
  };
  return (
    <div className="bg-slate-500 h-screen">
      <h1 className="text-5xl text-center py-8">Learn The Fret Board</h1>
      <FretBoard notes={quiz ? [quiz] : []} totalFret={fretAmount} stringTuning={stringTuning} />
      <NotePad onClick={answerClick} />
      <div className="border border-stone-950 p-2">
        <h1 className=" text-lg">What is this note?</h1>
        <p>string:{quiz?.string}</p>
        <p>fret: {quiz?.fret}</p>
        <button
          className="rounded-lg bg-white  border border-black text-blue-950  px-4"
          onClick={generateNextQuiz}
        >
          Next
        </button>
      </div>
    </div>
  );
}
