import DragCard from "./DragCard";
import { PiNotePencil } from "react-icons/pi";
import { TbTextPlus } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { FaPaintbrush } from "react-icons/fa6";
import { PiCodeBold } from "react-icons/pi";
import { useDrop } from "react-dnd";
import React, { useState } from "react";
import { Empty } from "antd";
import FieldCustomization from "./FieldCustomization";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ShowGeneratedCode from "./ShowGeneratedCode";
import DraggableForm from "./DraggableForm";

type FieldTypes =
  | "text"
  | "select"
  | "checkbox"
  | "textarea"
  | "radio"
  | "number"
  | "search"
  | "button";

export type FormFields = {
  key?: string;
  id?: number;
  icon?: React.ReactNode;
  label: string;
  type: FieldTypes;
  placeholder?: string;
  rows?: number;
  options?: { value: string }[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  styling?: {
    className: string;
    width: number;
    widthType: string;
    color: string;
    innerBorder?: string;
  };
};

type FormValues = {
  [key: string]: any;
};

function DragDrop() {
  const [formState, setFormState] = useState<FormFields[]>([]);
  const [, setElementId] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(true);
  const [selectCustomiz, setSelectCustomize] = useState<FormFields>();
  const [showCode, setShowCode] = useState<boolean>(false);

  const [, drop] = useDrop(() => ({
    accept: "DragBOX",
    drop: (item: FormFields) => addField(item),
  }));

  const addField = (item: FormFields) => {
    setElementId((prevElementId) => {
      let newKey = `${item.type}_${Math.round(Math.random() * 1000)}`;

      const keys = formState?.map((item) => item.key);
      while (keys.includes(newKey)) {
        newKey = `${item.type}_${Math.round(Math.random() * 1000)}`;
      }

      const newItem: FormFields = {
        id: prevElementId,
        key: newKey,
        ...item,
      };
      setFormState((prevFormState) => [...prevFormState, newItem]);
      return prevElementId + 1;
    });
  };

  const fieldList: FormFields[] = [
    {
      type: "text",
      icon: <PiNotePencil />,
      label: "Input",
      placeholder: "",
      required: false,
      minLength: 1,
      maxLength: 30,
      pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
      styling: {
        className: "",
        width: 100,
        widthType: "%",
        color: "#000000",
        innerBorder: "#808080",
      },
    },
    {
      type: "checkbox",
      icon: <FiCheckSquare />,
      options: [{ value: "a" }],
      label: "Checkbox",
      required: false,
      styling: {
        className: "",
        width: 100,
        widthType: "%",
        color: "#000000",
      },
    },
    {
      type: "textarea",
      icon: <TbTextPlus />,
      label: "Textarea",
      placeholder: "",
      rows: 1,
      required: false,
      minLength: 1,
      maxLength: 30,
      pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
      styling: {
        className: "",
        width: 100,
        widthType: "%",
        color: "#000000",
        innerBorder: "#808080",
      },
    },
    {
      type: "select",
      icon: <IoChevronDown />,
      label: "Dropdown",
      options: [{ value: "a" }, { value: "b" }],
      required: false,
      styling: {
        className: "",
        width: 100,
        widthType: "%",
        color: "#000000",
        innerBorder: "#808080",
      },
    },
    {
      type: "radio",
      icon: <IoMdRadioButtonOn />,
      label: "Radio",
      options: [{ value: "a" }, { value: "b" }],
      required: false,
      styling: {
        className: "",
        width: 100,
        widthType: "%",
        color: "#000000",
      },
    },
  ];

  const handleCustomize = (data: FormFields) => {
    if (
      formState.filter((item) => item.id !== data.id && item.key === data.key)
        .length === 0
    ) {
      if (edit) {
        setFormState((pre) =>
          pre.map((item) => (item.id === data.id ? data : item))
        );
        reset();
        toast.success("Updated Successfuly");
      } else {
        toast.error("First Select Edit Form!");
      }
    } else {
      toast.error("Can't Update Key Already Exist!");
    }
  };

  const handleOnDelete = (id: any) => {
    setFormState((pre) => pre.filter((item) => item.id !== id));
    reset();
  };

  const handleMoveField = (dropIndex: number, field: FormFields) => {
    setFormState((pre) => {
      const newField = [...formState.filter((item) => item.id === field.id)]
      const newArr = [...pre.filter((item) => item.id !== field.id)];
      newArr.splice(dropIndex, 0, newField[0]);
      return newArr;
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    toast.success("Submitted Successfully !");
    reset();
  };

  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap w-full min-h-[500px] py-6">
      <div className="flex flex-col w-full gap-2 md:w-[13rem] md:border-gray-300 md:border-r  p-3 pb-5">
        <div className="text-xl text-center font-semibold text-blue-600">
          Fields
        </div>
        {fieldList.map((fieldItem, index) => (
          <DragCard key={index} fieldItem={fieldItem} />
        ))}
      </div>
      <div className="flex flex-col gap-2  p-3 lg:w-[60%] md:w-[70%]  w-full overflow-auto  text-gray-600 h-full  ">
        <div className="grid grid-cols-3 text-white items-center ">
          <div></div>
          <div className="flex justify-center">
            {edit ? (
              <button
                className="px-4 py-1  rounded-md bg-blue-500 flex gap-2 items-center shadow-blue-300 shadow-lg"
                onClick={() => setEdit(!edit)}
              >
                <FaPlay className="text-white" />
                <span>Preview</span>
              </button>
            ) : (
              <button
                className="px-4 py-1  rounded-md bg-green-500 flex gap-2 items-center  shadow-green-300 shadow-lg"
                onClick={() => setEdit(!edit)}
              >
                <FaPaintbrush />
                <span> Edit </span>
              </button>
            )}
          </div>
          <div className="flex justify-center text-gray-600 h-full">
            <button
              className="px-4 py-1  rounded-md bg-gray-100 flex gap-2 items-center  shadow-gray-300 shadow-lg"
              onClick={() => setShowCode(!showCode)}
            >
              <PiCodeBold size={20} />
            </button>
          </div>
        </div>
        {showCode ? (
          <ShowGeneratedCode formState={formState} />
        ) : (
          <form
            ref={edit ? drop : null}
            onSubmit={handleSubmit(onSubmit)}
            className=" border-2 border-gray-500 shadow-md shadow-gray-400 h-[465px]  rounded-md p-4  overflow-auto "
          >
            <div className="flex flex-wrap w-full gap-4">
              {formState?.map(
                (field, index: number) => (
                  <DraggableForm
                    key={field.id}
                    register={register}
                    field={field}
                    edit={edit}
                    selectCustomiz={selectCustomiz}
                    setSelectCustomize={setSelectCustomize}
                    handleOnDelete={handleOnDelete}
                    errors={errors}
                    index={index}
                    moveField={handleMoveField}
                  />
                )
                // switch (field.type) {
                //   case "text":
                //     return (
                //       <div
                //         key={field.id}
                //         style={{ width: `${field.styling?.width}%` }}
                //       >
                //         <Badge
                //           className={`w-full h-full`}
                //           offset={[-25, 0]}
                //           count={
                //             <div>
                //               {edit && (
                //                 <MdDeleteForever
                //                   className="text-red-600 text-xl cursor-pointer bg-white"
                //                   onClick={() => handleOnDelete(field?.id)}
                //                 />
                //               )}
                //             </div>
                //           }
                //         >
                //           <div
                //             className={` h-full p-2 border ${
                //               edit &&
                //               field.id === selectCustomiz?.id &&
                //               "border-blue-500"
                //             }  ${edit && "hover:border-blue-500"} rounded-md ${
                //               field.styling?.className
                //             }`}
                //             onClick={() => setSelectCustomize(field)}
                //           >
                //             <label
                //               htmlFor={`input_${field.id}`}
                //               className="block text-sm font-medium mb-1"
                //               style={{ color: field.styling?.color }}
                //             >
                //               {field.label}
                //               {field.required && (
                //                 <span className="text-[#ff0000] font-bold ">
                //                   {" "}
                //                   *
                //                 </span>
                //               )}
                //             </label>
                //             <input
                //               id={`input_${field.id}`}
                //               style={{
                //                 border: `1px solid ${field.styling?.innerBorder}`,
                //               }}
                //               {...register(`${field.key}`, {
                //                 required: field.required
                //                   ? {
                //                       value: true,
                //                       message: "This field is required",
                //                     }
                //                   : false,
                //                 minLength: field.minLength
                //                   ? {
                //                       value: field.minLength,
                //                       message: `Minimum length is ${field.minLength}`,
                //                     }
                //                   : undefined,
                //                 maxLength: field.maxLength
                //                   ? {
                //                       value: field.maxLength,
                //                       message: `Maximum length is ${field.maxLength}`,
                //                     }
                //                   : undefined,
                //                 pattern: field.pattern
                //                   ? {
                //                       value:  new RegExp(field.pattern),
                //                       message: "Invalid format",
                //                     }
                //                   : undefined,
                //               })}
                //               placeholder={field.placeholder}
                //               type="text"
                //               className={`border border-[#0d1b2a] rounded p-2 w-full focus-visible:border-[#0d1b2a] focus-visible:outline-none ${
                //                 edit && "pointer-events-none"
                //               }`}
                //             />

                //             {errors?.[`${field.key}`] && (
                //               <p className="text-red-500 text-[12px]">
                //                 {errors?.[`${field.key}`]?.message as ReactNode}
                //               </p>
                //             )}
                //           </div>
                //         </Badge>
                //       </div>
                //     );
                //   case "textarea":
                //     return (
                //       <div
                //         key={field.id}
                //         style={{ width: `${field.styling?.width}%` }}
                //       >
                //         <Badge
                //           className={`w-full h-full`}
                //           key={field.id}
                //           offset={[-25, 0]}
                //           count={
                //             <div>
                //               {edit && (
                //                 <MdDeleteForever
                //                   className="text-red-600 text-xl cursor-pointer bg-white"
                //                   onClick={() => handleOnDelete(field?.id)}
                //                 />
                //               )}
                //             </div>
                //           }
                //         >
                //           <div
                //             className={`h-full p-2 border ${
                //               edit &&
                //               field.id === selectCustomiz?.id &&
                //               "border-blue-500"
                //             } ${edit && "hover:border-blue-500"}  rounded-md`}
                //             onClick={() => setSelectCustomize(field)}
                //           >
                //             <label
                //               htmlFor={`textarea_${field.id}`}
                //               className="block text-sm font-medium mb-1"
                //               style={{ color: field.styling?.color }}
                //             >
                //               {field.label}
                //               {field.required && (
                //                 <span className="text-[#ff0000] font-bold ">
                //                   {" "}
                //                   *
                //                 </span>
                //               )}
                //             </label>
                //             <textarea
                //               style={{
                //                 border: `1px solid ${field.styling?.innerBorder}`,
                //               }}
                //               id={`textarea_${field.id}`}
                //               rows={field.rows}
                //               placeholder={field.placeholder}
                //               {...register(`${field.key}`, {
                //                 required: field.required
                //                   ? {
                //                       value: true,
                //                       message: "This field is required",
                //                     }
                //                   : false,
                //                 minLength: field.minLength
                //                   ? {
                //                       value: field.minLength,
                //                       message: `Minimum length is ${field.minLength}`,
                //                     }
                //                   : undefined,
                //                 maxLength: field.maxLength
                //                   ? {
                //                       value: field.maxLength,
                //                       message: `Maximum length is ${field.maxLength}`,
                //                     }
                //                   : undefined,
                //                 pattern: field.pattern
                //                   ? {
                //                       value: new RegExp(field.pattern),
                //                       message: "Invalid format",
                //                     }
                //                   : undefined,
                //               })}
                //               className={`border rounded p-2 w-full resize-none focus-visible:border-[#0d1b2a] focus-visible:outline-none ${
                //                 edit && "pointer-events-none"
                //               } `}
                //             />
                //             {errors?.[`${field.key}`] && (
                //               <p className="text-red-500 text-[12px]">
                //                 {errors?.[`${field.key}`]?.message as ReactNode}
                //               </p>
                //             )}
                //           </div>
                //         </Badge>
                //       </div>
                //     );
                //   case "select":
                //     return (
                //       <div
                //         key={field.id}
                //         style={{ width: `${field.styling?.width}%` }}
                //       >
                //         <Badge
                //           className={`w-full h-full`}
                //           key={field.id}
                //           offset={[-25, 0]}
                //           count={
                //             <div>
                //               {edit && (
                //                 <MdDeleteForever
                //                   className="text-red-600 text-xl cursor-pointer bg-white"
                //                   onClick={() => handleOnDelete(field?.id)}
                //                 />
                //               )}
                //             </div>
                //           }
                //         >
                //           <div
                //             className={`h-full p-2 border ${
                //               edit &&
                //               field.id === selectCustomiz?.id &&
                //               "border-blue-500"
                //             } ${edit && "hover:border-blue-500"}  rounded-md`}
                //             onClick={() => setSelectCustomize(field)}
                //           >
                //             <label
                //               htmlFor={`select_${field.id}`}
                //               className="block text-sm font-medium mb-1"
                //               style={{ color: field.styling?.color }}
                //             >
                //               {field.label}
                //               {field.required && (
                //                 <span className="text-[#ff0000] font-bold ">
                //                   {" "}
                //                   *
                //                 </span>
                //               )}
                //             </label>
                //             <select
                //               id={`select_${field.id}`}
                //               {...register(`${field.key}`, {
                //                 required: field.required
                //                   ? {
                //                       value: true,
                //                       message: "This field is required",
                //                     }
                //                   : false,
                //               })}
                //               style={{
                //                 border: `1px solid ${field.styling?.innerBorder}`,
                //               }}
                //               name={`select_${field.id}`}
                //               className={`border rounded p-2 w-full focus-visible:border-[#0d1b2a] focus-visible:outline-none${
                //                 edit && "pointer-events-none"
                //               }`}
                //             >
                //               {field.options?.map((option, index) => (
                //                 <option key={index} value={option.value}>
                //                   {option.value}
                //                 </option>
                //               ))}
                //             </select>
                //             {errors?.[`${field.key}`] && (
                //               <p className="text-red-500 text-[12px]">
                //                 {errors?.[`${field.key}`]?.message as ReactNode}
                //               </p>
                //             )}
                //           </div>
                //         </Badge>
                //       </div>
                //     );
                //   case "radio":
                //     return (
                //       <div
                //         key={field.id}
                //         style={{ width: `${field.styling?.width}%` }}
                //       >
                //         <Badge
                //           className={`w-full h-full `}
                //           key={field.id}
                //           offset={[-25, 0]}
                //           count={
                //             <div>
                //               {edit && (
                //                 <MdDeleteForever
                //                   className="text-red-600 text-xl cursor-pointer bg-white"
                //                   onClick={() => handleOnDelete(field?.id)}
                //                 />
                //               )}
                //             </div>
                //           }
                //         >
                //           <div
                //             key={field.id}
                //             className={` h-full p-2 border ${
                //               edit &&
                //               field.id === selectCustomiz?.id &&
                //               "border-blue-500"
                //             } ${edit && "hover:border-blue-500"}  rounded-md`}
                //             onClick={() => setSelectCustomize(field)}
                //           >
                //             <label
                //               className="block text-sm font-medium mb-1"
                //               style={{ color: field.styling?.color }}
                //             >
                //               {field.label}
                //               {field.required && (
                //                 <span className="text-[#ff0000] font-bold ">
                //                   {" "}
                //                   *
                //                 </span>
                //               )}
                //             </label>
                //             <div className="flex items-center gap-2">
                //               {field.options?.map((option, index) => (
                //                 <div
                //                   className="flex flex-wrap gap-1 items-center"
                //                   key={index}
                //                 >
                //                   <input
                //                     {...register(`${field.key}`, {
                //                       required: field.required
                //                         ? {
                //                             value: true,
                //                             message: "This field is required",
                //                           }
                //                         : false,
                //                     })}
                //                     value={option.value}
                //                     className={`${edit && "pointer-events-none"}`}
                //                     type="radio"
                //                     id={`radio_${index}`}
                //                   />
                //                   <label
                //                     htmlFor={`radio_${index}`}
                //                     className=" text-sm font-medium "
                //                   >
                //                     {option.value}
                //                   </label>
                //                 </div>
                //               ))}
                //             </div>
                //             {errors?.[`${field.key}`] && (
                //               <p className="text-red-500 text-[12px]">
                //                 {errors?.[`${field.key}`]?.message as ReactNode}
                //               </p>
                //             )}
                //           </div>
                //         </Badge>
                //       </div>
                //     );
                //   case "checkbox":
                //     return (
                //       <div
                //         key={field.id}
                //         style={{ width: `${field.styling?.width}%` }}
                //       >
                //         <Badge
                //           className={`w-full h-full`}
                //           key={field.id}
                //           offset={[-25, 0]}
                //           count={
                //             <div>
                //               {edit && (
                //                 <MdDeleteForever
                //                   className="text-red-600 text-xl cursor-pointer bg-white"
                //                   onClick={() => handleOnDelete(field?.id)}
                //                 />
                //               )}
                //             </div>
                //           }
                //         >
                //           <div
                //             key={field.id}
                //             className={`h-full p-2 border ${
                //               edit &&
                //               field.id === selectCustomiz?.id &&
                //               "border-blue-500"
                //             } ${edit && "hover:border-blue-500"}  rounded-md`}
                //             onClick={() => setSelectCustomize(field)}
                //           >
                //             <label
                //               className="block text-sm font-medium mb-1"
                //               style={{ color: field.styling?.color }}
                //             >
                //               {field.label}
                //               {field.required && (
                //                 <span className="text-[#ff0000] font-bold ">
                //                   {" "}
                //                   *
                //                 </span>
                //               )}
                //             </label>
                //             <div className="flex flex-wrap gap-3">
                //               {field.options?.map((option, index) => (
                //                 <div
                //                   key={index}
                //                   className="flex gap-1 items-center"
                //                 >
                //                   <label
                //                     htmlFor={`checkbox_${index}`}
                //                     className=" text-sm font-medium "
                //                   >
                //                     {option.value}
                //                   </label>
                //                   <input
                //                     id={`checkbox_${index}`}
                //                     {...register(`${field.key}`, {
                //                       required: field.required
                //                         ? {
                //                             value: true,
                //                             message: "This field is required",
                //                           }
                //                         : false,
                //                     })}
                //                     value={option.value}
                //                     type="checkbox"
                //                     className={`border rounded p-2  ${
                //                       edit && "pointer-events-none"
                //                     }`}
                //                   />
                //                 </div>
                //               ))}
                //             </div>
                //             {errors?.[`${field.key}}`] && (
                //               <p className="text-red-500 text-[12px]">
                //                 {errors?.[`${field.key}`]?.message as ReactNode}
                //               </p>
                //             )}
                //           </div>
                //         </Badge>
                //       </div>
                //     );
                // }
              )}
            </div>
            {formState.length !== 0 ? (
              !edit && (
                <div className="flex w-full justify-center items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              )
            ) : (
              <div className="w-full justify-center ">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Field Added"/>
              </div>
            )}
          </form>
        )}
      </div>
      <div className="flex flex-col w-full gap-3 md:max-w-80 md:border-gray-300 md:border-l p-3 pb-5">
        {edit ? (
          !selectCustomiz ? (
            <div className="grow flex items-center justify-center">
              <div>Select field to edit properties</div>
            </div>
          ) : (
            <FieldCustomization
              customizeData={selectCustomiz}
              handleCustomize={handleCustomize}
            />
          )
        ) : (
          <div className="grow flex items-center justify-center">
            <div>Select edit to perform operations</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DragDrop;
