import React from 'react';

const NOTE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const FRET_MARK = [3, 5, 7, 9];

export type TNote = {
  string: number;
  fret: number;
  color: string;
  showingNote: boolean;
};

type TFretBoard = {
  notes?: TNote[];
  totalFret?: number;
  stringTuning?: string[];
};

export const getNote = (stringIdx: number, fretIdx: number, stringTuning: string[]) => {
  const tuningString = stringTuning[stringIdx];
  const index = (NOTE.indexOf(tuningString) + fretIdx) % NOTE.length;
  return NOTE[index];
};

const getFretPositionIndex = (stringIdx: number, fretIdx: number) => `${stringIdx}-${fretIdx}`;

function FretBoard({
  notes = [{ string: 3, fret: 7, color: 'bg-violet-400', showingNote: true }],
  totalFret = 12,
  stringTuning = ['E', 'A', 'D', 'G', 'B', 'E'].reverse(),
}: TFretBoard) {
  const notesMap = notes.reduce((map, note) => {
    if (!note) return map;
    const notePosition = getFretPositionIndex(note.string, note.fret);
    map[notePosition] = note;
    return map;
  }, {} as Record<string, any>);

  const NoteOnFretBoard = ({ note }: { note: TNote }) => {
    const { string, fret, color = 'bg-cyan-400', showingNote } = note;
    const noteMark = getNote(string, fret, stringTuning);

    return (
      <div
        className={`absolute rounded-full ${color} opacity-70 font-white w-8 aspect-square text-center leading-8  border-white border z-20`}
      >
        {showingNote ? noteMark : ''}
      </div>
    );
  };
  return (
    <div className="flex flex-col bg-yellow-700 h-[300px]">
      {stringTuning.map((_, stringIdx) => {
        return (
          <div
            key={stringIdx}
            className=" flex before:absolute before:mt-[21px]  before:z-10 before:h-2 before:w-full before:bg-gradient-to-b before:from-white before:to-gray-600 after:z-10 h-[50px]"
          >
            {Array.from({ length: totalFret + 1 }).map((_, fretIdx) => {
              const currentPosition = getFretPositionIndex(stringIdx, fretIdx);
              const isNoteMarked = currentPosition in notesMap;
              const fretMark = stringIdx === 3 && FRET_MARK.includes(fretIdx % 12);
              const twelveMark = [2, 4].includes(stringIdx) && fretIdx === 12;
              const mark = fretMark || twelveMark;

              return (
                <div
                  key={currentPosition}
                  className="grow border-r-4 border-gray-300 flex justify-center items-center relative first:bg-yellow-950"
                >
                  {mark && (
                    <div className="w-6 bg-gray-300 rounded-full aspect-square absolute mt-[-50px]" />
                  )}
                  {isNoteMarked && <NoteOnFretBoard note={notesMap[currentPosition]} />}
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
