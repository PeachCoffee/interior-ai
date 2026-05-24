"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useUser } from "@clerk/nextjs";

import RoomDesignCard from "./RoomDesignCard";

import AiOutputDialog from "../create-new/_components/AiOutputDialog";

import axios from "axios";

function Listing() {
  const { user } = useUser();

  const [userRoomList, setUserRoomList] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    user && GetUserRoomList();
  }, [user]);

  const GetUserRoomList = async () => {
    const result = await axios.get(
      "/api/user-room-designs?email=" +
        user?.primaryEmailAddress?.emailAddress
    );

    console.log(result.data);

    setUserRoomList(result.data.result);
  };

  return (
    <div>
      <div className="flex justify-between items-center text-xl font-bold">
        <h2>
          Hello, {user?.fullName}
        </h2>

        <Link href="/dashboard/create-new">
          <button className="btn btn-primary">
            + Generate AI Interior
          </button>
        </Link>
      </div>

      {userRoomList?.length == 0 ? (
        <div className="flex justify-center items-center h-full text-2xl text-gray-500 mt-32">
          No Interior AI Designs Generated Yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {userRoomList.map((room, index) => (
            <div
              key={index}
              onClick={() => {
                setOpenDialog(true);
                setSelectedRoom(room);
              }}
            >
              <RoomDesignCard room={room} />
            </div>
          ))}
        </div>
      )}

      <AiOutputDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        aiImage={selectedRoom?.aiImage}
        orgImage={selectedRoom?.orgImage}
      />
    </div>
  );
}

export default Listing;