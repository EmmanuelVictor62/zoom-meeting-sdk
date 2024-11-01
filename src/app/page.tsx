"use client";
import React from "react";
import styles from "./page.module.css";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const Home: React.FC = () => {
  const client = ZoomMtgEmbedded.createClient();

  const authEndpoint = "http://localhost:3000";
  const sdkKey = "";
  const meetingNumber = "";
  const passWord = "";
  const role = 0;
  const userName = "React";
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";

  const getSignature = async () => {
    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      const res = await req.json();
      const signature = res.signature as string;
      startMeeting(signature);
    } catch (e) {
      console.log(e);
    }
  };

  async function startMeeting(signature: string) {
    const meetingSDKElement = document.getElementById("meetingSDKElement")!;
    try {
      await client.init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
      });
      await client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        password: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
      });
      console.log("joined successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles["home"]}>
      <h1>Zoom Meeting SDK Sample React</h1>
      <div id="meetingSDKElement"></div>
      <button onClick={getSignature}>Join Meeting</button>
    </div>
  );
};

export default Home;
