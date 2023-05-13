import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Page2() {
  useEffect(() => {
    function start() {
      // Call the start function from the script.js file
      window.start();
    }

    function showResults() {
      // Call the showResults function from the script.js file
      window.showResults();
    }

    function copyToClipboard() {
      // Call the copytoClipboard function from the script.js file
      window.copytoClipboard();
    }

    document.getElementById("start").addEventListener("click", start);
    document
      .getElementById("btnResults")
      .addEventListener("click", showResults);
    document
      .getElementById("btnCopy")
      .addEventListener("click", copyToClipboard);
  }, []);

  const handleDownload = (fileName) => {
    const textContent = document.getElementById("txtResults").value;
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName; // Set the custom file name here
    document.body.appendChild(element); // Required for compatibility
    element.click();
    document.body.removeChild(element); // Clean up
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Head>
        <title>Fitts&apos; Law 2D</title>
        <script src="/script2.js" />
      </Head>
      <h1 className="title">Fitts&apos; Law 2D</h1>
      <p id="text">Let&apos;s get started </p>

      {/* ask for stuff */}
      <div id="radio-c" className="inline fields">
        <label>Hand Dominance</label>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="hand-dominance"
              defaultChecked="defaultChecked"
              value="Dominant"
            />
            <label>Dominant Hand</label>
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
        <label>Pointing Device</label>
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
        <label>Device Experience</label>
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

      <div id="div1">
        <button className="button" id="start">
          Start
        </button>
        <br />
        <button className="button" id="btnResults">
          Get Results
        </button>
        <br />
        <input className="result" id="txtResults" type="text" />
        <br />
        <button className="button" id="btnCopy">
          Copy Results to Clipboard
        </button>
        <br />
        <button className="button" id="download" onClick={handleDownload}>
          Download Results
        </button>

        <Link className="button" href="/" id="back">
          Back
        </Link>
      </div>

      <canvas id="canvasLayer"></canvas>
    </main>
  );
}
