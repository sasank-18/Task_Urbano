import mandala from "../assets/decorative-mandala.svg";

const MandalaBgLayout = ({children}) => {
  return (
    <>
      <main className="relative min-h-auto mx-4 md:mx-12 flex flex-col ">
        {/* background of categories and services */}

        <section className="">
          <img
            alt="Logo"
            className="rotate-90 -z-10 fixed opacity-30 top-0 -left-56"
            width={650}
            src={mandala}
          />

          <img
            alt="Logo"
            className=" fixed -z-10 opacity-75 -right-44 -rotate-90 bottom-16 "
            width={650}
            src={mandala}
          />
        </section>

           {children}
      </main>
    </>
  );
};

export default MandalaBgLayout;
