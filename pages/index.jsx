import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

function redactText(wordsToRedact, text) {
  if (wordsToRedact.length === 0) return text;

  const regex = new RegExp(`\\b(${wordsToRedact.join("|")})\\b`, "g");

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
    const groupingsToRedact =
      wordsToRedact.match(/(\w|\s)*\w(?=("|'))|\w+/g) || [];
    const filteredText = redactText(groupingsToRedact, originalText);
    setResultText(filteredText);
  }, [originalText, wordsToRedact]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Redactor</title>
        <meta name="description" content="A tool for redacting documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Redactor 9001</h1>
        <div className="mb-3 mt-6 w-1/2">
          <input
            onChange={(e) => setWordsToRedact(e.target.value)}
            value={wordsToRedact}
            type="text"
            placeholder={`Words and "phrases to redact"`}
            className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
          />
        </div>
        <div className="mb-3 mt-6 w-full h-full">
          <div className="pl-3 pr-3 w-1/2 h-full inline-block">
            <textarea
              onChange={(e) => setOriginalText(e.target.value)}
              value={originalText}
              type="textarea"
              placeholder="Text to be Redacted"
              className="px-3 py-4 h-full resize-none placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="pl-3 pr-3 w-1/2 h-full inline-block">
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
