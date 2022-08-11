import { FormContact } from "./FormContact"

export const Contact = () => {
    return (
        <>

            <div id="contact" className="container mx-auto h-[100vh] sm:h-[80vh] px-10 md:px-5">

                <h3 className='text-6xl text-center font-bold py-10'>Contact</h3>

                <FormContact />
            </div>
        </>
    )
}
