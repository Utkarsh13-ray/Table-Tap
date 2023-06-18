
const SidebarElements = ({setDisplay, title, icon, handleModel}) => {
  const handleClick = (title) => {
    if(handleModel===undefined) {
      setDisplay(title)
    } else {
      handleModel(true)
    }
  }
  return (
    <div onClick={()=>handleClick(title)} className="flex hover:bg-highlight px-10 py-2 my-4 items-center text-lg rounded-xl">
      <div className="flex items-center ">
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </div>
    </div>
  )
}

export default SidebarElements