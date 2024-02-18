'use client';

import { useState } from 'react';
import FretBoard, { TNote, getNote } from './component/FretBoard';
import NotePad from './component/NotePad';

export default function LearnTheFretBoard() {
  const fretAmount = 15;
  const stringTuning = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();
  const [quiz, setQuiz] = useState<TNote>();
  const [notes, setNotes] = useState<TNote[]>([]);
  const generateNote = (
    stringIdx: number,
    fretIdx: number,
    noteColor: string,
    showingNote: boolean,
    noteLabel?: string
  ): TNote => {
    return { string: stringIdx, fret: fretIdx, color: noteColor, showingNote: showingNote };
  };

  const generateNextQuiz = () => {
    const stringIdx = Math.floor(Math.random() * stringTuning.length);
    const fretIdx = Math.floor(Math.random() * fretAmount);

    const quizNote = generateNote(stringIdx, fretIdx, 'bg-rose-500', false);
    setQuiz(quizNote);
    setNotes([quizNote]);
  };

  const answerClick = (note: string) => {
    if (!quiz) return;
    const { fret, string } = quiz;
    console.log(getNote(string, fret, stringTuning), note);
    if (note === getNote(string, fret, stringTuning)) {
      const quizNote = generateNote(string, fret, 'bg-sky-500', true);
      // TODO: should have a algorithm for determine which reference note can be showed
      if (quiz.string === 5) {
        // note at the first string, showing the notes I already now
        const notesIKnown = [3, 5, 7, 8, 10].map((fretIdx) =>
          generateNote(5, fretIdx, 'bg-sky-200', true)
        );
        setNotes([...notesIKnown, quizNote]);
      } else if ([3, 4].includes(quiz.string)) {
        // show the root as the quiz note is 5th if it is 4 5
        const rootNote = generateNote(string + 1, fret - 2, 'bg-sky-200', true);
        setNotes([rootNote, quizNote]);
      } else {
        setNotes([quizNote]);
      }
      setTimeout(() => {
        generateNextQuiz();
      }, 1500);
    } else {
      alert('Stupid!');
    }
  };
  return (
    <div className="bg-slate-500 h-screen">
      <h1 className="text-5xl text-center py-8">Learn The Fret Board</h1>
      <FretBoard notes={notes} totalFret={fretAmount} stringTuning={stringTuning} />
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
