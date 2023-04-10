import React from "react"
import { SelectProps, TOption } from "./Select.types"
import { SelectStyled, Option } from "./Select.styled"
import { motion, AnimatePresence } from "framer-motion"

const Select: React.FC<SelectProps> = (props) => {
  const ref = React.useRef<null | HTMLDivElement>(null)
  const [isFocus, setIsFocus] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selected, setSelected] = React.useState<string | null>(null)
  const options = Array.isArray(props.options) ? props.options : []

  React.useEffect(() => {
    const listener = (event: any) => {
      if (!ref?.current || ref?.current?.contains(event.target)) return
      setIsFocus(false);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.addEventListener("keyup", listener);
    };
  }, [ref]);

  React.useEffect(() => {
    setSelected(props.value!);
  }, [props.value]);

  React.useEffect(() => {
    if (props.disabled) {
      setIsFocus(false)
      setSearch("")
      setSelected(null)
    }
  }, [props.disabled])


  const onClickOption = (newValue: TOption) => {
    setSearch("")
    setSelected(newValue.value);
    props.onChange!(newValue);
    setIsFocus(false);
  };

  const onClickSelect = () => {
    setSearch("");
    if (!props.disabled) {
      setIsFocus(!isFocus);
    }
  };

  const onKeyDownSelect = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      onClickSelect();
    }
  };

  const onKeyDownOption = (e: React.KeyboardEvent<HTMLLIElement>, value: TOption) => {
    if (e.key === " ") {
      e.preventDefault();
      onClickOption(value);
    }
  };

  const filterOptions = options?.filter((option) => {
    return props.customFilter!({ option, search })
  });

  const hasValue = !!options.find((val) => val.value === selected)

  const optionsVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  const optionVariants = {
    hidden: { maxHeight: 0, opacity: 0, padding: "0 15px", marginBottom: "0" },
    visible: { maxHeight: 300, opacity: 1, padding: "10px 15px", marginBottom: "5px" }
  }

  return (
    <SelectStyled
      className={`AltairSelect-root ${props.className}`}
      ref={ref!}
      hasValue={hasValue}
      isFocus={isFocus}
      disabled={props.disabled}
      error={props.error}
    >
      {props.label && <div className="AltairSelect-label">{props.label}</div>}
      <div className="AltairSelect-selected" onClick={onClickSelect} tabIndex={props.disabled ? undefined : 0} onKeyDown={onKeyDownSelect}>
        <div className="AltairSelect-selected-label">
          {hasValue ? props.customSelected!(options.find((val) => val.value === selected)!!) : <p className="AltairSelect-placeholder">{props.placeholder}</p>}
        </div>
        <div className="AltairSelect-selected-icon"><ChevronUp /></div>
      </div>
      {!isFocus && props.helperText && <div className="AltairSelect-helpertext">{props.helperText}</div>}
      <AnimatePresence>
        {isFocus && (
          <motion.ul variants={optionsVariants} initial="hidden" animate="visible" exit="hidden" className="AltairSelect-options">
            {props.withSearch && options.length > 0 && (
              <div className="AltairSelect-search">
                <input className="AltairSelect-search-input" type="text" value={search} placeholder="Pencarian.." onChange={(e) => setSearch(e.target.value)} />
                <Search />
              </div>
            )}
            {filterOptions.length === 0 && (
              <div className="AltairSelect-noData">No Data</div>
            )}
            <div className="AltairSelect-options-scroll">
              <AnimatePresence>
                {filterOptions.map((option) => (
                  <Option
                    variants={optionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key={option.value}
                    className="AltairSelect-option"
                    selected={option.value === selected}
                    onClick={() => onClickOption(option)}
                    onKeyDown={(e) => onKeyDownOption(e, option)}
                    tabIndex={0}
                    disabled={option.disabled}
                  >
                    {props.customOption!(option)}
                    {option.value === selected && <CheckIcon />}
                  </Option>
                ))}
              </AnimatePresence>
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </SelectStyled >
  );
};

Select.defaultProps = {
  disabled: false,
  withSearch: false,
  onChange: (value) => value,
  options: [],
  error: false,
  className: "",
  customOption: (value) => value?.label!!,
  customSelected: (value) => value?.label!!,
  customFilter: ({ option, search }) => !!option?.label?.toLowerCase()?.includes(search?.toLowerCase())
};

export default Select;

const CheckIcon = () => (
  <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M416 128L192 384l-96-96" /></svg>
)

const ChevronUp = () => (
  <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 328l144-144 144 144" /></svg>
)

const Search = () => (
  <svg viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448" /></svg>
)