import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { getContract } from "../../configureWarpClient";

const Template1 = () => {
  const [resume, setResume] = useState({
    name: "",
    workExp: "",
  });
  const router = useRouter();

  const createResume = async () => {
    if (!resume.name || !resume.workExp) return;
    resume.id = uuid();
    const contract = await getContract();
    try {
      const result = await contract.writeInteraction({
        function: "createResume",
        resume,
      });
      console.log("result:", result);
      router.push("/");
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <div className="min-h-screen">
      <input
        value={resume.name}
        placeholder="Your name"
        onChange={(e) => setResume({ ...resume, name: e.target.value })}
      />
      <textarea
        value={resume.workExp}
        placeholder="Work Exp"
        onChange={(e) => setResume({ ...resume, workExp: e.target.value })}
      />
      <button onClick={createResume}>Create Resume</button>
    </div>
  );
};

export default Template1;
