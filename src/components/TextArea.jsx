import { motion } from 'framer-motion';
import { useState } from 'react';


const TextArea = ({
  icon: Icon,
  label, value:
  controlledValue,
  onChange,
  counter: {
    max: maxLength,
    show: showTextCounter,
  } = {},
  ...props
}) => {


  const [internalValue, setInternalValue] = useState("");

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    const newValue = e.target?.value;

    if (isControlled) {
      onChange?.(e);
    } else {
      setInternalValue(newValue);
    }
  };

  const percent = maxLength ? (value.length / maxLength) * 100 : 0;

  const colorClass = {
    "text-gray-500": percent < 80,
    "text-orange-500": percent >= 80 && percent <= 100,
    "text-red-600": percent > 100,
  };

  const selectedClass = Object.entries(colorClass).find(([key, value]) => value === true)?.at(0);

  return <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
    {Icon && <Icon className="absolute text-xl pointer-events-none left-3 top-4 text-emerald-400" />}
    <textarea
      {...props}
      value={value}
      onChange={handleChange}
      maxLength={null}
      className={`peer w-full ${Icon ? "pl-10" : ""} ${selectedClass} pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#23272f] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-transparent resize-none`}
    ></textarea>
    {label && <label htmlFor={props.name} className="absolute left-10 top-4 text-gray-500 dark:text-gray-400 text-base transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 bg-white dark:bg-[#23272f] px-1 peer-focus:px-1">
      {label}
    </label>}
    {showTextCounter && maxLength && (
      <p className={`mt-1 text-right text-sm ${selectedClass}`}>
        {value.length} / {maxLength}
      </p>
    )}
  </motion.div>;
}

export default TextArea