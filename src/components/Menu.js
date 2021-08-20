import React from "react";
import { Link } from "react-router-dom";
import logo from "./logos/logo.jpg";

function Menu() {

  return (
    <>
      <div className="bg-light-blue-300 ...">
        <img src={logo} className="object-cover h-full w-full" alt="logotype" />
      </div>

      <footer className="bg-gray-800 pt-10 sm:mt-10 pt-10">
    <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">

            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                Rad 1
            </div>


            <Link to="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                Lorem ipsum
            </Link>
        </div>


        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">

            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                Rad 2
            </div>

            <Link to="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
            Lorem ipsum
            </Link>
        </div>

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">

            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                Rad 3
            </div>

            <Link to="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
            Lorem ipsum
            </Link>
        </div>


        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">

            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                Rad 4
            </div>

            <Link to="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
            Lorem ipsum
            </Link>
        </div>
    </div>


    <div className="pt-2">
        <div className="flex pb-5 px-3 m-auto pt-5 
            border-t border-gray-500 text-gray-400 text-sm 
            flex-col md:flex-row max-w-6xl">
            <div className="mt-2">
                © Copyright 1999-year. All Rights Reserved.
            </div>
        </div>
    </div>
</footer>


    </>
  );
}

export default Menu;
