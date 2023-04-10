import React from "react";
import { Story, Meta } from "@storybook/react";
import Select from "./Select";
import { SelectProps, TOption } from "./Select.types";
import styled from "styled-components";


const SelectCaption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px 5px;
  > p {
    margin: 0;
    line-height: 1;
  }
  > p:nth-child(1) {
    font-weight: 500;
    font-size: 14px;
    color: #2b2f3c;
  }
  > p:nth-child(2) {
    font-weight: 400;
    font-size: 12px;
    color: #727c98;
  }
`;


export default {
  title: "COMPONENTS/Select",
  component: Select,
  argTypes: {
    options: { control: "object" },
  },
  args: {
    withSearch: true,
    disabled: false,
    error: false,
    label: "Caption",
    placeholder: "Placeholder",
    value: "",
    helperText: "",
    width: "300px",
    maxHeight: "200px",
  },
} as Meta<typeof Select>;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const StandarSelect = Template.bind({});
StandarSelect.args = {
  options: [
    { label: "Caption 1", value: "1" },
    { label: "Caption 2", value: "2" },
    { label: "Caption 3", value: "3", disabled: true },
    { label: "Caption 4", value: "4" },
    { label: "Caption 5", value: "5", disabled: true },
    { label: "Caption 6", value: "6" },
    { label: "Caption 7", value: "7" },
  ],
};

export const SelectWithCaption = Template.bind({});
SelectWithCaption.args = {
  options: [
    { label: "Caption 1", value: "1", caption: "Description 1" },
    { label: "Caption 2", value: "2", caption: "Description 2" },
    {
      label: "Caption 3",
      value: "3",
      caption: "Description 3",
      disabled: true,
    },
    { label: "Caption 4", value: "4", caption: "Description 4" },
    {
      label: "Caption 5",
      value: "5",
      caption: "Description 5",
      disabled: true,
    },
    { label: "Caption 6", value: "6", caption: "Description 6" },
    { label: "Caption 7", value: "7", caption: "Description 7" },
  ],
  customOption: (value: TOption) => (
    <SelectCaption>
      <p>{value?.label}</p>
      <p>{value?.caption}</p>
    </SelectCaption>
  ),
  customSelected: (value: TOption) => (
    <SelectCaption>
      <p>{value?.label}</p>
      <p>{value?.caption}</p>
    </SelectCaption>
  ),
  placeholder: (
    <SelectCaption>
      <p>Title</p>
      <p>Caption</p>
    </SelectCaption>
  )
};