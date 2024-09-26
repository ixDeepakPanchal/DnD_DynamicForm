import { Tooltip } from "antd";
import { FormFields } from "./DragDrop";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { useRef, useState } from "react";

interface prop {
  formState: FormFields[];
}
function ShowGeneratedCode({ formState }: prop) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const copyToClipboard = () => {
    const codeText = codeRef.current?.innerText || "";
    navigator.clipboard.writeText(codeText);
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 1000);
  };
  return (
    <div className="relative border-2 text-gray-700  border-gray-500 shadow-md shadow-gray-400  rounded-md p-4 h-[500px] w-full overflow-auto  ">
      <div className="absolute top-4 right-4">
        <Tooltip
          title={
            <div className="flex gap-1 items-center">
              Copied{" "}
              <span>
                <IoCheckmarkDone size={18} />
              </span>
            </div>
          }
          visible={tooltipVisible}
          trigger="click"
          color="blue"
        >
          <button
            className=" bg-blue-500 text-white px-2 py-2 rounded-md shadow-md hover:bg-blue-600 z-10"
            onClick={copyToClipboard}
          >
            {" "}
            <MdOutlineContentCopy size={18} />
          </button>
        </Tooltip>
      </div>
      <pre ref={codeRef}>
        <code>
          {`import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      ${formState
        ?.map((field) => {
          switch (field.type) {
            case "text":
              return `\n\t  <input type="text" ${
                field.placeholder && `placeholder="${field.placeholder}"`
              } {...register("${field.key}", {required: ${field.required}${
                field.required ? `,minLength: ${field.minLength}` : ""
              }, maxLength: ${field.maxLength},pattern:/${
                field.pattern
              }/})} /> `;
            case "textarea":
              return `\n\t  <input type="textarea"${
                field.placeholder && ` placeholder="${field.placeholder}" `
              }${field.rows && ` rows={${field.rows}} `}{...register("${
                field.key
              }", {required: ${field.required}${
                field.required ? `,minLength: ${field.minLength}` : ""
              }, maxLength: ${field.maxLength},pattern:/${
                field.pattern
              }/})} />`;
            case "checkbox":
              return `\n\t  <input type="checkbox" {...register("${field.key}", {required: ${field.required}})}/>`;
            case "select":
              return `\n\t  <select {...register("${field.key}", { required: ${
                field.required
              } })}>
         ${field.options
           ?.map(
             (option) =>
               `\n\t\t  <option value="${option.value}">${option.value}</option>`
           )
           .join("")}
      </select>\n`;
            case "radio":
              return ` ${field.options
                ?.map(
                  (option) =>
                    `\n\t  <input {...register("${field.key}", { required: ${field.required}})} type="radio" value="${option.value}" /> `
                )
                .join("")}`;
          }
        })
        .join("")}
      <input type="submit" />
    </form>
  );
}`}
        </code>
      </pre>
    </div>
  );
}

export default ShowGeneratedCode;
