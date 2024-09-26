import { Badge } from "antd";
import React, { ReactNode, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FormFields } from "./DragDrop";
import { useDrag, useDrop } from "react-dnd";

interface prop {
  register: any;
  field: FormFields;
  edit: boolean;
  selectCustomiz: FormFields | undefined;
  setSelectCustomize: (field: FormFields) => void;
  handleOnDelete: (message: number | undefined) => void;
  errors: any;
  index: number;
  moveField: (dropIndex: number, field: FormFields) => void;
}

function DraggableForm({
  register,
  field,
  edit,
  selectCustomiz,
  setSelectCustomize,
  handleOnDelete,
  errors,
  index,
  moveField,
}: prop) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [dropIndex, setDropIndex] = useState<number>();

  const [, drag] = useDrag(() => ({
    type: "FormDrag",
    item: { field },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "FormDrag",
    drop: (item: { field: FormFields }) => {
      if (dropIndex !== undefined) {
        moveField(dropIndex, item.field);
      }
    },
    hover() {
      setDropIndex(() => index);
    },
  });

  drag(drop(ref));

  const renderForm = () => {
    switch (field.type) {
      case "text":
        return (
          <Badge
            className={`w-full h-full`}
            offset={[-25, 0]}
            count={
              <div>
                {edit && (
                  <MdDeleteForever
                    className="text-red-600 text-xl cursor-pointer bg-white"
                    onClick={() => handleOnDelete(field?.id)}
                  />
                )}
              </div>
            }
          >
            <div
              className={` h-full p-2 border ${
                edit && field.id === selectCustomiz?.id && "border-blue-500"
              }  ${edit && "hover:border-blue-500"} rounded-md ${
                field.styling?.className
              }`}
              onClick={() => setSelectCustomize(field)}
            >
              <label
                htmlFor={`input_${field.id}`}
                className="block text-sm font-medium mb-1"
                style={{ color: field.styling?.color }}
              >
                {field.label}
                {field.required && (
                  <span className="text-[#ff0000] font-bold "> *</span>
                )}
              </label>
              <input
                id={`input_${field.id}`}
                style={{
                  border: `1px solid ${field.styling?.innerBorder}`,
                }}
                {...register(`${field.key}`, {
                  required: field.required
                    ? {
                        value: true,
                        message: "This field is required",
                      }
                    : false,
                  minLength: field.minLength
                    ? {
                        value: field.minLength,
                        message: `Minimum length is ${field.minLength}`,
                      }
                    : undefined,
                  maxLength: field.maxLength
                    ? {
                        value: field.maxLength,
                        message: `Maximum length is ${field.maxLength}`,
                      }
                    : undefined,
                  pattern: field.pattern
                    ? {
                        value: new RegExp(field.pattern),
                        message: "Invalid format",
                      }
                    : undefined,
                })}
                placeholder={field.placeholder}
                type="text"
                className={`border border-[#0d1b2a] rounded p-2 w-full focus-visible:border-[#0d1b2a] focus-visible:outline-none ${
                  edit && "pointer-events-none"
                }`}
              />

              {errors?.[`${field.key}`] && (
                <p className="text-red-500 text-[12px]">
                  {errors?.[`${field.key}`]?.message as ReactNode}
                </p>
              )}
            </div>
          </Badge>
        );
      case "textarea":
        return (
          <Badge
            className={`w-full h-full`}
            key={field.id}
            offset={[-25, 0]}
            count={
              <div>
                {edit && (
                  <MdDeleteForever
                    className="text-red-600 text-xl cursor-pointer bg-white"
                    onClick={() => handleOnDelete(field?.id)}
                  />
                )}
              </div>
            }
          >
            <div
              className={`h-full p-2 border ${
                edit && field.id === selectCustomiz?.id && "border-blue-500"
              } ${edit && "hover:border-blue-500"}  rounded-md`}
              onClick={() => setSelectCustomize(field)}
            >
              <label
                htmlFor={`textarea_${field.id}`}
                className="block text-sm font-medium mb-1"
                style={{ color: field.styling?.color }}
              >
                {field.label}
                {field.required && (
                  <span className="text-[#ff0000] font-bold "> *</span>
                )}
              </label>
              <textarea
                style={{
                  border: `1px solid ${field.styling?.innerBorder}`,
                }}
                id={`textarea_${field.id}`}
                rows={field.rows}
                placeholder={field.placeholder}
                {...register(`${field.key}`, {
                  required: field.required
                    ? {
                        value: true,
                        message: "This field is required",
                      }
                    : false,
                  minLength: field.minLength
                    ? {
                        value: field.minLength,
                        message: `Minimum length is ${field.minLength}`,
                      }
                    : undefined,
                  maxLength: field.maxLength
                    ? {
                        value: field.maxLength,
                        message: `Maximum length is ${field.maxLength}`,
                      }
                    : undefined,
                  pattern: field.pattern
                    ? {
                        value: new RegExp(field.pattern),
                        message: "Invalid format",
                      }
                    : undefined,
                })}
                className={`border rounded p-2 w-full resize-none focus-visible:border-[#0d1b2a] focus-visible:outline-none ${
                  edit && "pointer-events-none"
                } `}
              />
              {errors?.[`${field.key}`] && (
                <p className="text-red-500 text-[12px]">
                  {errors?.[`${field.key}`]?.message as ReactNode}
                </p>
              )}
            </div>
          </Badge>
        );
      case "select":
        return (
          <Badge
            className={`w-full h-full`}
            key={field.id}
            offset={[-25, 0]}
            count={
              <div>
                {edit && (
                  <MdDeleteForever
                    className="text-red-600 text-xl cursor-pointer bg-white"
                    onClick={() => handleOnDelete(field?.id)}
                  />
                )}
              </div>
            }
          >
            <div
              className={`h-full p-2 border ${
                edit && field.id === selectCustomiz?.id && "border-blue-500"
              } ${edit && "hover:border-blue-500"}  rounded-md`}
              onClick={() => setSelectCustomize(field)}
            >
              <label
                htmlFor={`select_${field.id}`}
                className="block text-sm font-medium mb-1"
                style={{ color: field.styling?.color }}
              >
                {field.label}
                {field.required && (
                  <span className="text-[#ff0000] font-bold "> *</span>
                )}
              </label>
              <select
                id={`select_${field.id}`}
                {...register(`${field.key}`, {
                  required: field.required
                    ? {
                        value: true,
                        message: "This field is required",
                      }
                    : false,
                })}
                style={{
                  border: `1px solid ${field.styling?.innerBorder}`,
                }}
                name={`select_${field.id}`}
                className={`border rounded p-2 w-full focus-visible:border-[#0d1b2a] focus-visible:outline-none${
                  edit && "pointer-events-none"
                }`}
              >
                {field.options?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
              {errors?.[`${field.key}`] && (
                <p className="text-red-500 text-[12px]">
                  {errors?.[`${field.key}`]?.message as ReactNode}
                </p>
              )}
            </div>
          </Badge>
        );
      case "radio":
        return (
          <Badge
            className={`w-full h-full `}
            key={field.id}
            offset={[-25, 0]}
            count={
              <div>
                {edit && (
                  <MdDeleteForever
                    className="text-red-600 text-xl cursor-pointer bg-white"
                    onClick={() => handleOnDelete(field?.id)}
                  />
                )}
              </div>
            }
          >
            <div
              key={field.id}
              className={` h-full p-2 border ${
                edit && field.id === selectCustomiz?.id && "border-blue-500"
              } ${edit && "hover:border-blue-500"}  rounded-md`}
              onClick={() => setSelectCustomize(field)}
            >
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: field.styling?.color }}
              >
                {field.label}
                {field.required && (
                  <span className="text-[#ff0000] font-bold "> *</span>
                )}
              </label>
              <div className="flex items-center gap-2">
                {field.options?.map((option, index) => (
                  <div
                    className="flex flex-wrap gap-1 items-center"
                    key={index}
                  >
                    <input
                      {...register(`${field.key}`, {
                        required: field.required
                          ? {
                              value: true,
                              message: "This field is required",
                            }
                          : false,
                      })}
                      value={option.value}
                      className={`${edit && "pointer-events-none"}`}
                      type="radio"
                      id={`radio_${index}`}
                    />
                    <label
                      htmlFor={`radio_${index}`}
                      className=" text-sm font-medium "
                    >
                      {option.value}
                    </label>
                  </div>
                ))}
              </div>
              {errors?.[`${field.key}`] && (
                <p className="text-red-500 text-[12px]">
                  {errors?.[`${field.key}`]?.message as ReactNode}
                </p>
              )}
            </div>
          </Badge>
        );
      case "checkbox":
        return (
          <Badge
            className={`w-full h-full`}
            key={field.id}
            offset={[-25, 0]}
            count={
              <div>
                {edit && (
                  <MdDeleteForever
                    className="text-red-600 text-xl cursor-pointer bg-white"
                    onClick={() => handleOnDelete(field?.id)}
                  />
                )}
              </div>
            }
          >
            <div
              key={field.id}
              className={`h-full p-2 border ${
                edit && field.id === selectCustomiz?.id && "border-blue-500"
              } ${edit && "hover:border-blue-500"}  rounded-md`}
              onClick={() => setSelectCustomize(field)}
            >
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: field.styling?.color }}
              >
                {field.label}
                {field.required && (
                  <span className="text-[#ff0000] font-bold "> *</span>
                )}
              </label>
              <div className="flex flex-wrap gap-3">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <label
                      htmlFor={`checkbox_${index}`}
                      className=" text-sm font-medium "
                    >
                      {option.value}
                    </label>
                    <input
                      id={`checkbox_${index}`}
                      {...register(`${field.key}`, {
                        required: field.required
                          ? {
                              value: true,
                              message: "This field is required",
                            }
                          : false,
                      })}
                      value={option.value}
                      type="checkbox"
                      className={`border rounded p-2  ${
                        edit && "pointer-events-none"
                      }`}
                    />
                  </div>
                ))}
              </div>
              {errors?.[`${field.key}}`] && (
                <p className="text-red-500 text-[12px]">
                  {errors?.[`${field.key}`]?.message as ReactNode}
                </p>
              )}
            </div>
          </Badge>
        );
    }
  };
  return (
    <div
      ref={ref}
      style={{
        width: `${field.styling?.width
          .toString()
          .concat(field.styling.widthType)}`,
      }}
    >
      {renderForm()}
    </div>
  );
}

export default DraggableForm;
