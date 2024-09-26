
import { useDrag } from "react-dnd";
import { FormFields } from "./DragDrop";

interface prop {
  fieldItem: FormFields;
}

function DragCard({ fieldItem }: prop) {
  const [, drag] = useDrag(() => ({
    type: "DragBOX",
    item: fieldItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className="flex h-10 gap-2 w-full border border-gray-400 rounded-md items-center px-2 hover:bg-gray-100"
    >
      <div>{fieldItem.icon}</div>
      <div>{fieldItem.label}</div>
    </div>
  );
}

export default DragCard;
