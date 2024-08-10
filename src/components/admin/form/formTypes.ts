import { z } from "zod";

export interface FormInputType {
    [key: string]: string | boolean | number | null;
};

export interface dataDbType {
    [key: string]: string | boolean | number | null;
};

export type SchemaType =
  | z.ZodString
  | z.ZodAny
  | z.ZodBoolean
  | z.ZodNumber
  | z.ZodOptional<z.ZodTypeAny>
  | z.ZodDefault<z.ZodTypeAny>;

export type SchemaObjectType = { [key: string]: SchemaType };

export interface Field {
    name: string;
    type: string;
    title?: string;
    oneLanguage?: boolean;
    schema: SchemaType;
    sanitize?: boolean;
    asInt?: boolean;
    asBool?: boolean;
    asSlug?: boolean;
    default?: string | boolean | number;
};

export type PageSchemaType = {
    [key: string]: z.ZodString;
};

export interface FormDataConfig<T> {
    fetchByUid: (uid: string) => Promise<T[] | null>;
    fields: Field[];
};
