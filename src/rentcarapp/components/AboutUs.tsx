
export const AboutUs = () => {
  return (
    <>
      <div className="container mx-auto h-[80vh]">

        <h3 id="about_us" className='text-6xl text-center font-bold py-10'>About Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10">
          <div className="flex items-center justify-center">
            <img className="h-80" src="https://images.pexels.com/photos/5668838/pexels-photo-5668838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          </div>
          <div className="md:w-[70%] w-full">
            <h2 className="text-center font-bold text-5xl">You start the engine and your adventure begins</h2>
            <p className="text-gray-400 py-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat delectus nesciunt soluta cumque illum harum explicabo laborum ab culpa odit autem, dicta reprehenderit deserunt molestias quod sit animi quo hic!</p>

          </div>
        </div>

      </div>
    </>
  )
}
