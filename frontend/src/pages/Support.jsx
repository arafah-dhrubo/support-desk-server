import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineTicket } from "react-icons/hi";
import { IoTicketOutline } from "react-icons/io5";
const Support = () => {
  return (
    <section className="bg-blue-50 w-full h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-4xl font-bold mb-2">What do you need help with?</h1>
        <p className="text-center font-semibold text-gray-600 mb-2">
          Choose from an option below
        </p>
        <div className="flex gap-3 mt-10">
          <Link
            to="/new-ticket"
            className="p-5 text-xl rounded flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white gap-3 items-center"
          >
            <HiOutlineTicket className="text-3xl" /> Create New Ticket
          </Link>
          <Link
            to="/tickets"
            className="p-5 text-xl rounded flex text-white gap-3 items-center bg-gradient-to-r from-pink-500 via-orange-500 to-orange-500"
          >
            <IoTicketOutline className="text-3xl" /> View My Tickets
          </Link>
        </div>{" "}
      </div>
    </section>
  );
};

export default Support;
