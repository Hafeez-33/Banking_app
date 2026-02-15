import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

import { Control, FieldPath } from "react-hook-form";
import z from "zod";
import { authformSchema } from "@/lib/utils";

const formschema = authformSchema("sign-up");

interface CustomizidInputProps {
  control: Control<z.infer<typeof formschema>>;
  name: FieldPath<z.infer<typeof formschema>>;
  placeholder: string;
  label: string;
}

const CustomizidInput = ({
  control,
  name,
  placeholder,
  label,
}: CustomizidInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <FormLabel className="text-base w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>

          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={name === "password" ? "password" : "text"} // if name means fiels is email the text will not hide and if it is password it will hide the text
                className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                {...field}
              />
            </FormControl>

            <FormMessage className="text-12 text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomizidInput;
