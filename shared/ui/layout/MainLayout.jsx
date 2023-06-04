const MainLayout = ({ header = null, content = null }) => {
  return (
    <div className="flex flex-col background-white">
      {header}
      <div className="px-6 sm:px-12">
        {content}
      </div>
    </div>
  )
}

export default MainLayout