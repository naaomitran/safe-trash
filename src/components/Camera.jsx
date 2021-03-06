import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Grommet, Button, Box, Meter } from 'grommet';


const Camera = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [page, setPage] = useState("main");
  const [confidence, setConfidence] = useState(0);

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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let recyclenum = 0;
  let garbnum = 0;


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
          setPage("recyclePage");
          await sleep(5500);
          setPage("main");
          recyclenum++;
        } if (name === "compost") {
          setPage("compostPage");
          await sleep(5500);
          setPage("main");
        } else {
          setPage("garbagePage");
          await sleep(5500);
          setPage("main");
          garbnum++;
        }
      } catch (error) {
        console.error(error);
        // alert("An error occurred, please try again.");
        alert("taking pic and sending");

      }

      // //update visualizations
      // if (recyclenum % 100) {
      //   // updateRM();
      // }
      // if (garbnum % 100) {
      //   // updateGM();

      // }

    }
  };

  // function updateRM = () => {

  // };

  // function updateGM = () => {

  // };

  const takePic = () => {
    sendImage(capture());
  };

  return (
    <div className="container-fluid">
      <div>
        <Box direction='column' align='start'>
        <Button label="Take Picture" color='#205072' onClick={takePic} align='start'/>

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
        </Box>

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

export default Camera;