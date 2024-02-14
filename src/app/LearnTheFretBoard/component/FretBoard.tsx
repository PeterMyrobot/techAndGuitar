import React from "react";

const NOTE = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const TUNING = ["E", "A", "D", "G", "B", "E"];

const FRET = 12;

type TNote = {
  string: number;
  fret: number;
  color: string;
};

type TFretBoard = {
  notes: TNote[];
};

const getNote = (startNote: string, fret: number) => {
  const index = (NOTE.indexOf(startNote) + fret) % NOTE.length;
  return NOTE[index];
};

function FretBoard({ notes }: TFretBoard) {
  return (
    <div className="flex flex-col bg-yellow-700 h-[300px]">
      {TUNING.reverse().map((note, index) => {
        return (
          <div
            key={index}
            className=" flex before:absolute before:mt-[21px] before:bg-blue-500 before:h-2 before:w-full before:bg-gradient-to-b before:from-white before:to-gray-600 after:z-10 h-[50px]"
          >
            {Array.from({ length: FRET + 1 }).map((_, i) => {
              return (
                <div
                  key={`${index}-${i}`}
                  className="grow border-r-4 border-gray-300 ] flex justify-center items-center "
                >
                  <div className="rounded-full bg-cyan-400 opacity-70 font-white h-6 w-6 text-center border-white">
                    {getNote(note, i)}
                  </div>
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
