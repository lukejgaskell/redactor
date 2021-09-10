import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

function redactText(wordsToRedact, text) {
  const groupingsToRedact =
    wordsToRedact.match(/(\w|\s)*\w(?=("|'))|\w+/g) || [];

  if (groupingsToRedact.length === 0) return text;

  const regex = new RegExp(`\\b(${groupingsToRedact.join("|")})\\b`, "g");

  const result = text.replace(regex, (v) => {
    console.log(v);

    return "XXXX";
  });

  return result;
}

export default function Home() {
  const [originalText, setOriginalText] = useState("");
  const [wordsToRedact, setWordsToRedact] = useState("");
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    const filteredText = redactText(wordsToRedact, originalText);
    setResultText(filteredText);
  }, [originalText, wordsToRedact]);

  function readFile(e) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setOriginalText(text);
    };
    reader.readAsText(e.target.files[0]);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Redactor</title>
        <meta name="description" content="A tool for redacting documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Redactor 9001</h1>
        <div className="mt-3 mb-3 w-full md:w-3/4 inline-block pl-3 pr-3">
          <input
            onChange={(e) => setWordsToRedact(e.target.value)}
            value={wordsToRedact}
            type="text"
            placeholder={`Words and "phrases to redact"`}
            className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
          />
        </div>
        <label className={styles.upload}>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="ml-1 text-base leading-normal">Select a file</span>
          <input type="file" className="hidden" onChange={readFile} />
        </label>
        <div className="mb-3 mt-6 w-full h-full">
          <div className="pl-3 pr-3 w-full md:w-1/2 h-full inline-block">
            <textarea
              onChange={(e) => setOriginalText(e.target.value)}
              value={originalText}
              type="textarea"
              placeholder="Text to be Redacted"
              className="px-3 py-4 h-full resize-none placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="pl-3 pr-3 w-full md:w-1/2 h-full inline-block">
            <textarea
              value={resultText}
              type="textarea"
              readOnly
              className="px-3 py-4 h-full resize-none placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none w-full"
            ></textarea>
          </div>
        </div>
      </main>
    </div>
  );
}
