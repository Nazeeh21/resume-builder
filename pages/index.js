import Head from "next/head";
import { Lato } from "next/font/google";
import { useEffect, useState } from "react";
import { getContract } from "@/configureWarpClient";
import { useRouter } from "next/router";

const lato = Lato({
  weight: "700",
  preload: true,
  subsets: ["latin"],
});

export default function Home() {
  const [resumes, setResumes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    readState();
  }, []);

  async function readState() {
    const contract = await getContract();
    try {
      const data = await contract.readState();
      console.log("data: ", data);
      const resumes = Object.values(data.cachedValue.state.resumes);
      setResumes(resumes);
      console.log("resumes: ", resumes);
    } catch (err) {
      console.log("error: ", err);
    }
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="min-h-screen flex flex-col justify-start items-center">
          <h1
            className={`${lato.className}  text-[3rem] text-blue-400 text-center pt-20`}
          >
            The Permanent Resume Solution
          </h1>
          <p className="w-6/12 mx-auto text-gray-500 text-center mt-8 text-[1.3rem]">
            Craft your professional profile effortlessly and store it
            permanently on Arweave with our app - the easy and secure way to
            build a lasting resume.
          </p>
          <button
            onClick={() => router.push("./templates/template1")}
            className="bg-blue-500 px-3 py-2 rounded-sm mt-20 font-bold"
          >
            Create Resume
          </button>
        </section>
      </main>
    </>
  );
}
