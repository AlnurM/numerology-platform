const TextField = ({ className = '', label, ...props }) => {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      {label && (
        <label className="text-lg">{label}</label>
      )}
      <textarea 
        className="mt-2 p-3 outline-none resize-none border rounded-lg"
        {...props}
      />
    </div>
  )
}

export default TextField
