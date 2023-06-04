const config = {
  default: 'bg-gray-100 text-gray-800',
  secondary: 'bg-blue-50 text-blue-700',
  positive: 'bg-green-100 text-green-800',
  negative: 'bg-red-100 text-red-800',
}
const Chip = ({ type = 'default', label, children, className, style = {} }) => {
  return (
    <div className="w-fit flex flex-col" style={style}>
      {label && <label className="mb-1 w-fit text-gray-700 text-sm font-medium block whitespace-nowrap">{label}</label>}
      <div className={`py-0.5 px-2.5 rounded-xl flex justify-center items-center ${config[type]} ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Chip