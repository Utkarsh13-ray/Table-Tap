
const SidebarElements = ({display, setDisplay, title, icon, handleModel, active}) => {
  const handleClick = (title) => {
    if(handleModel===undefined) {
      setDisplay(title)
    } else {
      handleModel(true)
    }
  }
  return (
    <div onClick={()=>handleClick(title)} className={`${display===title && `bg-secondary text-white border-l-4 border-red-700`} flex px-10 py-2 my-4 items-center text-lg `}>
      <div className="flex items-center ">
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </div>
    </div>
  )
}

export default SidebarElements