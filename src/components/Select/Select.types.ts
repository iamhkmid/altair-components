import React from "react";

export type TOption = ({ label?: string; value: string; disabled?: boolean; } & { [index: string]: string | boolean; })

export type SelectProps = {
  label?: string;
  value?: string;
  placeholder?: string | number | React.ReactNode;
  className?: string;
  onChange?: (value: TOption) => void;
  options?: TOption[];
  disabled?: boolean;
  withSearch?: boolean;
  searchKeys?: string[];
  error?: boolean;
  helperText?: string;
  width?: string;
  maxHeight?: string;
  customFilter?: (props: { option: TOption, search: string }) => boolean;
  customOption?: (props: TOption) => React.ReactNode | string;
  customSelected?: (props: TOption) => React.ReactNode | string;
}

export type StringArray = {
  [index: string]: string;
}