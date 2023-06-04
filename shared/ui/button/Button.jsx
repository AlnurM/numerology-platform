const Button = ({ className = '', children, ...props}) => {
  return (
    <button className={`py-3 bg-blue-50 text-blue-700 text-lg rounded-md ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
