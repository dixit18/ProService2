import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./Room.css";
import { useSelector } from "react-redux";

const Room = () => {
  const { videoId } = useParams();
  const currentUser = useSelector((state) => state.auth);

  const meetingRef = useRef(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appId = 1038036099;
      const serverSecret = "360ded5c1858d48a33382e4a77b22917";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        videoId,
        Date.now().toString() /* Enter your ID ha userId and given accesses of id*/,
        currentUser?.name
      );

      // console.log(
      //   kitToken,
      //   "gjdgfuyeffffffffgjhefgjgjhjjkfji34ubmnbkhbfiunwhd shwef hnwegfjhebnsdywejbqwfad"
      // );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      console.log(
        "************************************************************************************************"
      );
      console.log(zc);
      console.log(videoId);
      zc.joinRoom({
        container: meetingRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:5173:/video/${videoId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
          // mode: ZegoUIKitPrebuilt.GroupCall,
        },
        onLeaveRoom: () => {
          ZegoUIKitPrebuilt.hasJoinedRoom = false;
        },
      });
    };

    console.log("Meeting");
    myMeeting();
  }, [videoId]);

  return (
    <div>
      <div ref={meetingRef} className="meeting-container"></div>
    </div>
  );
};

export default Room;
