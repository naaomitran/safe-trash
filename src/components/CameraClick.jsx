import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Grommet, Button } from 'grommet';


const CameraClick = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [page, setPage] = useState("main");
  const [confidence, setConfidence] = useState(0);

  const { speak } = useSpeechSynthesis();

  const commands = [
    {
      command: "What is this?",
      callback: () => takePic(),
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const videoConstraints = {
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    console.log("image taken");
    console.log(imageSrc);
    return imageSrc;
  }, [webcamRef]);

  function sleep(ms) {
    // Synchronous Delay
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const sendImage = async (imgString) => {
    console.log("sending image");
    console.log(imgString);
    if (imgString) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/image`,
          {
            imgString,
          }
        );
        console.log(response.data);
        const { name, score } = response.data;
        setConfidence(score * 100);

        if (name === "recyle") {
          speak({ text: "Recyclable" });
          setPage("recyclePage");
          await sleep(5500);
          setPage("main");
          resetTranscript();
        } if (name === "compost") {
          speak({ text: "Compost" });
          setPage("compostPage");
          await sleep(5500);
          setPage("main");
          resetTranscript();
        } else {
          speak({ text: "Garbage" });
          setPage("garbagePage");
          await sleep(5500);
          setPage("main");
          resetTranscript();
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred, please try again.");
      }
    }
  };

  const takePic = () => {
    sendImage(capture());
  };


  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => SpeechRecognition.stopListening();
  }, [speak]);

  return (
    <div className="container-fluid">
      <div>
        <div className="Webcam">
          <Webcam
            audio={false}
            height={540}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={540}
            videoConstraints={videoConstraints}
          />
        </div>
        <div className="speech">Speech: {transcript}</div>
        <div>
          {image && (
            <div>
              <div>Image Taken</div>
              <img src={image} alt="missing" className="CapturedImage" />
            </div>
          )}
        </div>
      </div>
      
      {page === "recyclePage" && (
        <div id="recycle-overlay">
          <div id="recycle-text">Recyclable!</div>
          <div className="score">
            Recyclable item detected with {confidence}% confidence.
          </div>
        </div>
      )}
      {page === "compostPage" && (
        <div id="compost-overlay">
          <div id="compost-text">Compost!</div>
          <div className="score">
            Compost item detected with {confidence}% confidence.
          </div>
        </div>
      )}
      {page === "garbagePage" && (
        <div id="garbage-overlay">
          <div id="garbage-text">
            Garbage!
          </div>
          <div className="score">
            Garbage item detected with {confidence}% confidence.
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraClick;