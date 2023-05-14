import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function Page1() {
    const handleStart = () =>{
      // Call the start function from the script.js file
      window.start();
    }
// 
    const handleResults = () => {
      // Call the showResults function from the script.js file
      window.showResults();
    }

    const handleCopy = () => {
      // Call the copytoClipboard function from the script.js file
      window.copytoClipboard();
    }
   

  const handleDownload = () => {
    // document.body.removeChild(element); // Clean up
    window.download();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Fitts&apos; Law 1D</title>
        <script src="/script.js" />
      </Head>
      <h1 id="maintitle" className="title">Fitts&apos; Law</h1>
      <p id="text">Tap/Click the retangle </p>
      {/* ask for stuff */}
      <div id="radio-c" className="inline fields">
        <label className="titlename">Hand Dominance</label>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="hand-dominance"
              defaultChecked="defaultChecked"
              value="Dominant"
            />
            <label>
              Dominant Hand
            </label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="hand-dominance" value="Non-Dominant" />
            <label>Non-Dominant Hand</label>
          </div>
        </div>
      </div>

      <div id="radio-b" className="inline fields">
        <label className="titlename">Pointing Device</label>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="pointing-device"
              defaultChecked="defaultChecked"
              value="Mouse"
            />
            <label>Mouse</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="pointing-device" value="Touchpad" />
            <label>Touchpad</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="pointing-device" value="Joystick" />
            <label>Joystick</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="pointing-device" value="Trackpoint" />
            <label>Trackpoint</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="pointing-device" value="Other" />
            <label>Other</label>
          </div>
        </div>
      </div>

      <div id="radio-a" className="inline fields">
        <label className="titlename">Device Experience</label>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="device-experience" value="Regular user" />
            <label>Regular user</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="device-experience"
              value="Inexprerienced User"
            />
            <label>Inexprerienced User (some experience in other tool)</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="device-experience"
              defaultChecked="defaultChecked"
              value="Complete Novice "
            />
            <label>Complete Novice </label>
          </div>
        </div>
      </div>

      <div className="buttons4" id="div1">
        <button className="button center-hor" id="start" onClick={handleStart}>
          Start!
        </button>
        <br />
        <button className="button center-hor2" id="btnResults" onClick={handleResults}>
          Get Results
        </button>
        <br />
        <input className="result" id="txtResults" type="text" />
        <br />
        <button className="button center-hor3" id="btnCopy" onClick={handleCopy}>
          Copy Results to Clipboard
        </button>
        <br />
        <button className="button center-hor4" id="download" onClick={handleDownload}>
          Download Results
        </button>

        <Link className="button center-hor2" href="/" id="back">
          Back
        </Link>
      </div>

      <canvas id="canvasLayer"></canvas>
    </main>
  );
}
