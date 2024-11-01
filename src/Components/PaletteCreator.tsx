import { HexColorInput, HexColorPicker } from "react-colorful";
import ColorBlock from "./ColorBlock";
import { useEffect, useState } from "react";
import { parseColors } from "../pixellize";

interface PaletteProps {
  paletteColors: string[];
  setPaletteColors: (x: string[]) => void;
}

export default function PaletteCreator(props: PaletteProps) {
  const [color, setColor] = useState("#000000");

  const onAddColorClicked = () => {
    props.setPaletteColors([...props.paletteColors, color]);
  };

  const onClearColorsCLicked = () => {
    props.setPaletteColors([]);
  };

  useEffect(() => {
    localStorage.setItem("palette", JSON.stringify(props.paletteColors));
  }, [props.paletteColors]);

  useEffect(() => {
    
  }, []);

  return (
    <div className="flex flex-row gap-8 mt-6">
      <div className="flex flex-col">
        <HexColorPicker
          className="color-picker"
          color={color}
          onChange={setColor}
        />
        <HexColorInput
          color={color}
          onChange={setColor}
          className="text-black w-40 px-2 mt-4 mx-auto rounded-lg"
          placeholder="Hex value"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap gap-3 mb-6 mt-auto">
          {props.paletteColors.map((color, index) => (
            <ColorBlock id={`cb${index}`} color={color} />
          ))}
        </div>

        <input
          className="px-2 py-1 w-[40rem] rounded-lg text-black"
          type="text"
          placeholder="Paste colors"
          onChange={(e) => {
            const colors = parseColors(e.target.value);
            props.setPaletteColors(colors);
          }}
        />

        <div className="flex flex-row gap-5 mt-1 mb-2">
          <button onClick={onAddColorClicked}>Add</button>
          <button onClick={onClearColorsCLicked}>Clear</button>
        </div>
      </div>
    </div>
  );
}
