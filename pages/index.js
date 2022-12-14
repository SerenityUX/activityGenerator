import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { transform } from "framer-motion";

export default function Home() {
  const activities = [
    "to visit",
    "to bathe",
    "to cook",
    "to solve a puzzle",
    "to cry",
    "to garden",
    "to write in your journal",
    "to take a picture",
    "to sing",
    "to run",
    "to crochet",
    "to volunteer",
    "to have a picnic",
    "to call a friend",
  ];
  const locations = [
    "the beach",
    "your favorite cafe",
    "a library",
    "a nearby factory",
    "a restaurant",
    "an alley",
    "a mountain",
    "a local historic landmark",
    "a nearby park",
    "your local grocery store",
    "your closet",
  ];
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");
  const [isButtonPressed, setButtonPressed] = useState(false);
  const stc = require("string-to-color");
  const bgColor= (stc(activities[activity], locations[location]));
  const textColor = lightOrDark(bgColor);
  const variants = {
    unpressed: { scale: 0.9, opacity: 1.0, backgroundColor:"#000" },
    pressed: { scale: 1, opacity: 0.68, backgroundColor:"#000" },
  };

  function handleKeyPress() {
    console.log("You pressed a key.");
  }
  useEffect(() => {
    document.body.classList.add('background');
    document.body.style.margin = '0';

    setActivity(Math.floor(Math.random() * activities.length));
    setLocation(Math.floor(Math.random() * locations.length));

    document.addEventListener("keydown", detectKeyDown, true);
    document.addEventListener("keyup", detectKeyUp, true);
  }, []);


    function lightOrDark(color) {

      // Variables for red, green, blue values
      var r, g, b, hsp;
      
      // Check the format of the color, HEX or RGB?
      if (color.match(/^rgb/)) {

          // If RGB --> store the red, green, blue values in separate variables
          color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
          
          r = color[1];
          g = color[2];
          b = color[3];
      } 
      else {
          
          // If hex --> Convert it to RGB: http://gist.github.com/983661
          color = +("0x" + color.slice(1).replace( 
          color.length < 5 && /./g, '$&$&'));

          r = color >> 16;
          g = color >> 8 & 255;
          b = color & 255;
      }
      
      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
      );

      // Using the HSP value, determine whether the color is light or dark
      if (hsp>127.5) {

          return '#000';
      } 
      else {

          return '#fff';
      }
  }

  const detectKeyDown = (e) => {
    console.log("Clicked Key: ", e.key);
    if (e.key == " " && !isButtonPressed) {
      setActivity(Math.floor(Math.random() * activities.length));
      setLocation(Math.floor(Math.random() * locations.length));
      setButtonPressed(true);
    }
  };
  const detectKeyUp = (e) => {
    setButtonPressed(false);
  };

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, width: "100vw", height: "100vh", margin: 0, display: "block"}} onKeyPress={(e) => handleKeyPress(e)}>
      <Head>
        <title>Activity Generator</title>
        <meta name="description" content="Activities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} >
        <h1 className={styles.mainHeader}>Activity Generator</h1>
        <div>
          <text className={styles.defaultText}>
            <text className={styles.lowOpacity}>
            Try{" "}
            </text>
            <strong className={styles.strongText}>
              {activities[activity]}
            </strong>
            <br></br>
            <text className={styles.lowOpacity}>
            at{" "}
            </text>
            <strong className={styles.strongText}>{locations[location]}</strong>
          </text>
        </div>
        <div>
          <text className={styles.captionText}>
            Press
            <motion.div
              className={styles.pressableButtonContainer}
              initial={{ opacity: 0.25, scale: 0.75 }}
              animate={isButtonPressed ? "unpressed" : "pressed"}
              variants={variants}
              transition={{ duration: 0.1, delay: 0.05 }}
            >
              <strong
                className={styles.pressableButton}
                onClick={() => {
                  console.log(activity);
                  console.log(location);

                  setActivity(Math.floor(Math.random() * activities.length));
                  setLocation(Math.floor(Math.random() * locations.length));
                }}
              >
                Space
              </strong>
            </motion.div>
            to Generate a New Activity
          </text>
        </div>
      </main>
    </div>
  );
}
