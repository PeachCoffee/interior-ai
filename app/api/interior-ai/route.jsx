import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";
import { Buffer } from "buffer";

import { db } from "../../../config/db";
import { AiGeneratedImage } from "../../../config/schema";

import { storage } from "../../../config/firebaseConfig";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Base64 변환
async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}

export async function POST(request) {
  console.log("STEP 1: API START");

  const { imageUrl, roomType, designType, additionalReq, userEmail } =
    await request.json();

  console.log("STEP 2:", roomType, designType);
  console.log("USER EMAIL:", userEmail);

  try {
    // 1. prompt 생성
    const input = {
      image: imageUrl,
      prompt:
        "A " +
        roomType +
        " with a " +
        designType +
        " style interior " +
        additionalReq,
    };

    // 2. AI 생성
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    const outputUrl = Array.isArray(output) ? output[0] : output;

    // 3. base64 변환
    const base64Image = await ConvertImageToBase64(outputUrl);

    // 4. Firebase 저장
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, "interior-ai/" + fileName);

    await uploadString(storageRef, base64Image, "data_url");

    const downloadUrl = await getDownloadURL(storageRef);

    console.log("downloadUrl:", downloadUrl);

    // 5. DB 저장
    const dbResult = await db.insert(AiGeneratedImage).values({
      roomType,
      designType,
      orgImage: imageUrl,
      aiImage: downloadUrl,
      userEmail: userEmail ?? null,
    }).returning({ id: AiGeneratedImage.id });

    console.log("DB RESULT:", dbResult);

    // 6. 응답
    return NextResponse.json({
      result: downloadUrl,
    });

  } catch (e) {
    console.log("ERROR:", e);

    return NextResponse.json({
      error: e.message,
    });
  }
}