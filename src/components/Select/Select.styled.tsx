import styled, { css } from "styled-components";
import { motion } from "framer-motion"

type TMain = {
  width?: string;
  hasValue: boolean;
  disabled?: boolean;
  isFocus?: boolean;
  error?: boolean;
}

export const SelectStyled = styled.div<TMain>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => width ? width : "100%"};
  .AltairSelect-label {
    height: fit-content;
    color: ${({ theme }) => theme.colors?.text?.[900]};
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 5px;
    ${({ isFocus }) => isFocus && css`
      color: ${({ theme }) => theme.colors?.primary?.[500]}; 
    `}
    ${({ error }) => error && css`
      color: ${({ theme }) => theme.colors?.red?.[500]};
    `}
    ${({ disabled }) => disabled && css`
      color: ${({ theme }) => theme.colors?.text?.[300]};
    `}
    transition: .3s all ease;
  }
  .AltairSelect-selected {
    display: flex;
    align-items: center;
    position: relative;
    gap: 8px;
    background-color: ${({ theme }) => theme.colors?.primary?.[50]};
    border: 1.5px solid ${({ theme }) => theme.colors?.gray?.[100]};
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px 15px;
    justify-content: space-between;
    cursor: pointer;
    ${({ isFocus }) => isFocus && css`
        border: 1.5px solid ${({ theme }) => theme.colors?.primary?.[300]};
        background: white;
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors?.primary?.[100]};
    `}
    ${({ error, isFocus }) => error && css`
      background-color: ${({ theme }) => theme.colors?.red?.[50]};
      border: 1.5px solid ${({ theme }) => theme.colors?.red?.[300]};
      ${isFocus && css`
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors?.red?.[100]};
        background-color: white;
      `}
    `}
    ${({ disabled }) => disabled && css`
      background: ${({ theme }) => theme.colors?.gray?.[50]};
      cursor: default;
      border: 1.5px solid ${({ theme }) => theme.colors?.text?.[200]};
      color: transparent;
    `}
    transition: 0.3s all ease;
  }
  .AltairSelect-selected-label {
    font-weight: 500;
    font-size: 14px;
    color: ${({ theme }) => theme.colors?.text?.[900]};
  }
  .AltairSelect-placeholder {
    color: ${({ theme }) => theme.colors?.text?.[400]};
    font-weight: 400;
    font-size: 14px;
    margin: 0;
    ${({ error }) => error && css`
      color: ${({ theme }) => theme.colors?.red?.[400]};
    `}
    ${({ disabled }) => disabled && css`
      color: ${({ theme }) => theme.colors?.text?.[300]};
    `}
    transition: .3s all ease;
  }
  .AltairSelect-selected-icon{
    display: flex;
    align-items: center;
    > svg {
      height: 20px;
      width: 20px;
      transition: 0.3s transform ease;
      transform: rotate(180deg);
      color: ${({ theme }) => theme.colors?.primary?.[500]};
    }
    ${({ isFocus }) => isFocus && css`
      > svg {
        transform: rotate(0);
      }
    `}
    ${({ disabled }) => disabled && css`
      > svg {
        color: ${({ theme }) => theme.colors?.text?.[300]};
      }
    `}
  }
  .AltairSelect-options {
    display: flex;
    position: absolute;
    z-index: 1;
    gap: 5px;
    padding: 5px;
    width: 100%;
    top: calc(100% - 10px);
    overflow: hidden;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 0px 4px 12px 1px rgba(175, 173, 200, 0.2);
    border-radius: 10px;
  }
  .AltairSelect-noData{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors?.text?.[800]};
  }
  .AltairSelect-options-scroll {
    display: flex;
    flex-direction: column; 
    max-height: 300px;
    padding-right: 5px;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors?.text?.[400]};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors?.text?.[500]};
    }
  }
  .AltairSelect-search {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 8px;
    position: relative;
    > svg {
      height: 20px;
      width: 20px;
      color: ${({ theme }) => theme.colors?.gray?.[200]};
      position: absolute;
      left: 15px;
      margin: 0 auto;
      transition: .3s all ease;
    }
    .AltairSelect-search-input{
      border: none;
      width: 100%;
      padding-left: 45px;
      border-radius: 8px;
      background: ${({ theme }) => theme.colors?.primary?.["50"]};
      color: ${({ theme }) => theme.colors?.text?.[900]};
      font-weight: 400;
      font-size: 14px;
      height: 44px;
      caret-color: ${({ theme }) => theme.colors?.primary?.[500]};
      outline: none;
      border: 1px solid transparent;
      ::placeholder { 
        color: ${({ theme }) => theme.colors?.text?.[300]};
        opacity: 1;
      }
      :-ms-input-placeholder {
        color: ${({ theme }) => theme.colors?.text?.[300]};
      }
      ::-ms-input-placeholder {
        color: ${({ theme }) => theme.colors?.text?.[300]};
      }
      :hover{
        outline: none;
      }
      :focus {
        ~ svg {
          color: ${({ theme }) => theme.colors?.primary?.[500]};
        }
      }
    }
  }
  .AltairSelect-helpertext {
    display: flex;
    gap: 5px;
    align-items: center;
    line-height: 1;
    padding: 0 2px;
    padding-top: 5px;
    font-weight: 400;
    font-size: 12px;
    color: ${({ theme }) => theme.colors?.text?.[500]};
    > svg {
      min-width: 14px;
      width: 14px;
      height: 14px;
    }
    ${({ error }) => error && css`
      color: ${({ theme }) => theme.colors?.red?.[500]};
    `}
    ${({ disabled }) => disabled && css`
      color: ${({ theme }) => theme.colors?.text?.[300]};
    `}
    transition: all ease .3s;
  }
`;

type TOption = {
  selected: boolean;
  disabled?: boolean;
}

export const Option = styled(motion.li)<TOption>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors?.text?.[900]};
  > svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background: ${({ theme }) => theme.colors?.primary?.[100]};
  }
  ${({ selected }) => selected && css`
    background: ${({ theme }) => theme.colors?.primary?.[200]};
  `}
  ${({ disabled }) => disabled && css`
    pointer-events: none;
    background: ${({ theme }) => theme.colors?.text?.[100]};
    color: ${({ theme }) => theme.colors?.text?.[400]};
  `}
  transition: background 0.3s ease;
`