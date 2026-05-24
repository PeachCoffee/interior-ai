"use client";

import React, { useState, useContext } from "react";
import axios from "axios";

import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";

import { useUser } from "@clerk/nextjs";

import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "./_components/AiOutputDialog";

//import { db } from "../../../config/db";
//import { Users } from "../../../config/schema";
import { UserDetailContext } from "../../_context/UserDetailContext";

function CreateNew() {
  const { user } = useUser();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [aiOutputImage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);

  const [orgImage, setOrgImage] = useState();

  const { userDetail, setUserDetail } =
    useContext(UserDetailContext);

  const updateUserCredits = async () => {
  const result = await axios.post("/api/update-user-credits", {
    credits: userDetail?.credits - 1,
    email: user?.emailAddresses?.[0]?.emailAddress,
  });

  if (result.data) {
    setUserDetail((prev) => ({
      ...prev,
      credits: userDetail?.credits - 1,
    }));
  }
};

  const generateAllImage = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("FORMDATA:", formData);
      console.log("BUTTON CLICKED");

      const rawImageUrl = await saveRawImageToFirebase();

      console.log(user);
      console.log("USER:", user);

      const result = await axios.post("/api/interior-ai", {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: user?.emailAddresses?.[0]?.emailAddress,
      });

      setAiOutputImage(result.data.result);

      await updateUserCredits();

      console.log("result", result.data);

      setOpenOutputDialog(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  console.log(formData);

  const saveRawImageToFirebase = async () => {
    const fileName = `${Date.now()}_raw.png`;

    const imageRef = ref(
      storage,
      `interior-ai/${fileName}`
    );

    await uploadBytes(imageRef, formData.image).then(
      (resp) => {
        console.log("File Uploaded...");
      }
    );

    const downloadUrl = await getDownloadURL(imageRef);

    console.log(downloadUrl);

    setOrgImage(downloadUrl);

    return downloadUrl;
  };

  return (
    <div>
      <h1>{loading ? "LOADING..." : "NOT LOADING"}</h1>

      <h2 className="text-3xl font-bold p-5">
        Create AI Interior
      </h2>

      {loading ? (
        <CustomLoading />
      ) : (
        <div className="grid grid-cols-2 gap-8 p-6">
          <div>
            <ImageSelection
              selectedFile={(value) =>
                onHandleInputChange(value, "image")
              }
            />
          </div>

          <div className="flex flex-col gap-6">
            <RoomType
              selectedRoomType={(value) =>
                onHandleInputChange(value, "roomType")
              }
            />

            <DesignType
              selectedDesignType={(value) =>
                onHandleInputChange(value, "designType")
              }
            />

            <AdditionalReq
              additionalReqInput={(value) =>
                onHandleInputChange(
                  value,
                  "additionalReq"
                )
              }
            />

            <button
              className="btn btn-primary w-full"
              onClick={generateAllImage}
            >
              Generate
            </button>
          </div>

          <AiOutputDialog
            openDialog={openOutputDialog}
            setOpenDialog={setOpenOutputDialog}
            orgImage={orgImage}
            aiImage={aiOutputImage}
          />
        </div>
      )}
    </div>
  );
}

export default CreateNew;