import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields } from "./DragDrop";
import React, { useEffect, useState } from "react";
import { FaPaintbrush } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

interface prop {
  customizeData: FormFields;
  handleCustomize: (data: FormFields) => void;
}

function FieldCustomization({ customizeData, handleCustomize }: prop) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();
  const [widthType, setWidthType] = useState<string>("%");
  const [arrayfield, setArrayField] = useState<{ value: string }[]>([]);
  const [customizeType, setCustomizeType] = useState<string>("main");

  useEffect(() => {
    setCustomizeType("main");
    customizeData.options && setArrayField(customizeData?.options);
    reset(customizeData);
  }, [customizeData]);

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    handleCustomize(
      customizeData.options ? { ...data, options: arrayfield } : data
    );
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = { value: e.target.value };
    setArrayField((pre) => pre.map((item, i) => (i === index ? value : item)));
  };
  const handleMaxLegth = (value: string) => {
    setWidthType(value);
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <button
          className={`text-gray-500 hover:text-blue-500  flex flex-col justify-center items-center  border-r border-gray-500  ${
            customizeType === "main" && "!text-blue-500"
          }`}
          onClick={() => setCustomizeType("main")}
        >
          <GoDotFill className="text-xl" />
          <span>Main</span>
        </button>
        <button
          className={`text-gray-500 hover:text-orange-500  flex flex-col justify-center items-center ${
            customizeType === "edit" && "text-orange-500"
          }`}
          onClick={() => setCustomizeType("edit")}
        >
          <FaPaintbrush /> <span>Style</span>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${
            customizeType === "main" ? "visible" : "hidden"
          } text-gray-600 text-sm font-medium p-2 flex flex-col gap-4`}
        >
          <div className="grid grid-cols-3 gap-1">
            <label className="col-span-1" htmlFor={`Key_${customizeData.id}`}>
              Key
              <span className="text-[#ff0000] font-bold "> *</span>
            </label>
            <input
              required
              className=" col-span-2 border rounded-md  px-2"
              id={`label_${customizeData.id}`}
              type="text"
              {...register("key", { required: true })}
            />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <label className="col-span-1" htmlFor={`label_${customizeData.id}`}>
              Label <span className="text-[#ff0000] font-bold "> *</span>
            </label>
            <input
              required
              className=" col-span-2 border rounded-md  px-2"
              id={`label_${customizeData.id}`}
              type="text"
              {...register("label", { required: true })}
            />
          </div>
          {customizeData.rows !== undefined && (
            <div className="grid grid-cols-3 gap-1">
              <label
                className="col-span-1"
                htmlFor={`rows_${customizeData.id}`}
              >
                Rows
              </label>
              <input
                className=" col-span-2 border rounded-md  px-2 "
                id={`rows_${customizeData.id}`}
                type="text"
                {...register("rows")}
              />
            </div>
          )}
          {customizeData.placeholder !== undefined && (
            <div className="grid grid-cols-3 gap-1">
              <label
                className="col-span-1"
                htmlFor={`placeholder_${customizeData.id}`}
              >
                Placeholder
              </label>
              <input
                className=" col-span-2 border rounded-md  px-2 "
                id={`placeholder_${customizeData.id}`}
                type="text"
                {...register("placeholder")}
              />
            </div>
          )}
          <div className="grid grid-cols-3 gap-1">
            <label
              className="col-span-1"
              htmlFor={`required_${customizeData.id}`}
            >
              Required
            </label>
            <input
              className="w-4 col-span-2 border rounded-md"
              id={`required_${customizeData.id}`}
              type="checkbox"
              {...register("required")}
            />
          </div>
          {(customizeData.minLength !== undefined ||
            customizeData.maxLength !== undefined) && (
            <>
              <div className="grid grid-cols-3 gap-1">
                <label
                  className="col-span-1"
                  htmlFor={`minLength_${customizeData.id}`}
                >
                  Min Length
                </label>
                <input
                  className="col-span-2 border rounded-md  px-2 "
                  id={`minLength_${customizeData.id}`}
                  type="number"
                  {...register("minLength", { min: 1 })}
                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <label
                  className="col-span-1"
                  htmlFor={`maxLength_${customizeData.id}`}
                >
                  Max Length
                </label>
                <input
                  className="col-span-2 border rounded-md  px-2 "
                  id={`maxLength_${customizeData.id}`}
                  type="number"
                  {...register("maxLength", { min: 1 })}
                />
              </div>
            </>
          )}
          {customizeData.pattern !== undefined && (
            <div
              className={`grid grid-cols-3 gap-1 relative ${
                errors.pattern?.message && "pb-4"
              }`}
            >
              <label
                className="col-span-1"
                htmlFor={`pattern_${customizeData.id}`}
              >
                Pattern
              </label>
              <input
                className=" col-span-2 border rounded-md  px-2 "
                id={`pattern_${customizeData.id}`}
                type="text"
                {...register("pattern")}
              />
            </div>
          )}

          {customizeData.options && (
            <div className="flex flex-col gap-3 justify-center">
              <div className="grid grid-cols-3 gap-1">
                <label className="col-span-1">Options</label>
                <button
                  type="button"
                  onClick={() => {
                    setArrayField((pre) => [...pre, { value: "" }]);
                  }}
                  className="bg-green-500 text-white px-2 rounded w-20 col-span-2 h-8"
                >
                  Add
                </button>
              </div>

              {arrayfield.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-1">
                  <input
                    required
                    maxLength={customizeData.maxLength}
                    placeholder="Enter option"
                    className="border col-span-2 rounded-md  px-2"
                    onChange={(e) => handleOnChange(e, index)}
                    value={item.value}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setArrayField((pre) => pre.filter((_, i) => i !== index))
                    }
                    className="bg-red-500 text-white px-2 rounded col-span-1 h-8"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className="border h-8 rounded-md flex justify-center items-center bg-blue-500 text-white hover:bg-blue-600">
            Update
          </button>
        </div>
        <div
          className={`${
            customizeType === "edit" ? "visible" : "hidden"
          } text-gray-600 text-sm font-medium p-2 flex flex-col gap-4`}
        >
          <div className="grid grid-cols-3 gap-1">
            <label className="col-span-1">Class Name</label>
            <input
              className="col-span-2 border rounded-md px-2"
              type="text"
              {...register("styling.className")}
            />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <label className="col-span-1">Width</label>
            <div className="col-span-2 flex items-center justify-between">
              <input
                min={0}
                max={widthType==="%"?100:756}
                className="w-[60%] border rounded-md px-2"
                type="number"
                {...register("styling.width")}
              />{" "}
              <select
                {...register("styling.widthType")}
                onChange={(e) => handleMaxLegth(e.target.value)}
                className="border rounded-md px-2"
              >
                <option value="px">px</option>
                <option value="%">%</option>
           
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <label className="col-span-1">Color</label>
            <input
              className="col-span-2 border rounded-md px-2 w-full"
              type="color"
              {...register("styling.color")}
            />
          </div>
          {customizeData.styling?.innerBorder && (
            <div className="grid grid-cols-3 gap-1">
              <label className="col-span-1">Inner Border</label>
              <input
                className="col-span-2 border rounded-md px-2 w-full"
                type="color"
                {...register("styling.innerBorder")}
              />
            </div>
          )}

          <button className="border h-8 rounded-md flex justify-center items-center bg-blue-500 text-white hover:bg-blue-600">
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default FieldCustomization;
