import React from 'react';

const NOTE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const TUNING = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();

const FRET = 12;

type TNote = {
  string: number;
  fret: number;
  color: string;
  showingNote: boolean;
};

type TFretBoard = {
  notes?: TNote[];
};

const getNote = (stringIdx: number, fretIdx: number) => {
  const tuningString = TUNING[stringIdx];
  const index = (NOTE.indexOf(tuningString) + fretIdx) % NOTE.length;
  return NOTE[index];
};

const getFretPositionIndex = (stringIdx: number, fretIdx: number) => `${stringIdx}-${fretIdx}`;

const NoteOnFretboard = ({ note }: { note: TNote }) => {
  const { string, fret, color = 'bg-cyan-400', showingNote } = note;
  const noteMark = getNote(string, fret);
  console.log(string, fret, color, showingNote, noteMark);

  return (
    <div
      className={`absolute rounded-full ${color} opacity-70 font-white w-8 aspect-square text-center leading-8  border-white border`}
    >
      {showingNote ? noteMark : ''}
    </div>
  );
};

function FretBoard({
  notes = [{ string: 3, fret: 7, color: 'bg-violet-400', showingNote: true }],
}: TFretBoard) {
  const notesMap = notes.reduce((map, note) => {
    const notePosition = getFretPositionIndex(note.string, note.fret);
    map[notePosition] = note;
    return map;
  }, {} as Record<string, any>);
  console.log({ notesMap });
  return (
    <div className="flex flex-col bg-yellow-700 h-[300px]">
      {TUNING.map((_, stringIdx) => {
        return (
          <div
            key={stringIdx}
            className=" flex before:absolute before:mt-[21px]  before:h-2 before:w-full before:bg-gradient-to-b before:from-white before:to-gray-600 after:z-10 h-[50px]"
          >
            {Array.from({ length: FRET + 1 }).map((_, fretIdx) => {
              const currentPosition = getFretPositionIndex(stringIdx, fretIdx);
              const isMarked = currentPosition in notesMap;

              return (
                <div
                  key={currentPosition}
                  className="grow border-r-4 border-gray-300 flex justify-center items-center "
                >
                  {isMarked && <NoteOnFretboard note={notesMap[currentPosition]} />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default FretBoard;
