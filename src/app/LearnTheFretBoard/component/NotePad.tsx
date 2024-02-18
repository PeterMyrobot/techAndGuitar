import React from 'react';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

type TNotePad = {
  onClick: (note: string) => void;
};

export default function NotePad({ onClick }: TNotePad) {
  return (
    <div className="flex w-[630px] aspect-[6/3]">
      {NOTES.map((note) => {
        if (note.includes('#')) {
          return (
            <button
              key={note}
              className="h-4/6 w-[60px] bg-black border-black border border-solid ml-[-30px] mr-[-30px] z-10 relative active:bg-gray-800"
              onClick={() => {
                onClick(note);
              }}
            >
              <div className="absolute bottom-0 flex justify-center w-full">{note}</div>
            </button>
          );
        }
        return (
          <button
            key={note}
            className="h-full w-[90px] bg-white border-black border border-solid relative active:bg-slate-200"
            onClick={() => {
              onClick(note);
            }}
          >
            <div className="absolute bottom-0 text-blue-400 flex justify-center w-full">{note}</div>
          </button>
        );
      })}
    </div>
  );
}
