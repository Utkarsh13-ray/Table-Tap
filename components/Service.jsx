

const Service = ({img, title}) => {
  return (
    <>
        <div className="loginDiv flex flex-col w-32 h-32 sm:h-32 sm:w-96 lg:w-32 lg:h-32 rounded-lg space-y-2" >
            <div className='p-4 mx-auto mt-4 mb-2 flex justify-center items-center'>
                {img}
            </div>
            <h1 className='text-center'>{title}</h1>
        </div>
    </>
  )
}

export default Service