export function handle(state, action) {
  /* address of the caller is available in action.caller */
  if (action.input.function === "initialize") {
    state.author = action.caller;
  }
  if (action.input.function === "createResume") {
    const resumes = state.resumes;
    
    ContractAssert(action.caller, "Caller is underfined");

    const userResume = resumes[action.caller] || {};
    console.log("userResume from contract.js: ", userResume);
    userResume[action.input.resume.id] = action.input.resume;
    resumes[action.caller] = userResume;
    state.resumes = resumes;
  }
  if (action.input.function === "updateResume") {
    const resumes = state.resumes;
    const userResume = resumes[action.caller];
    userResume[action.input.resume.id] = action.input.resume;
    resumes[action.caller] = userResume;
    state.resumes = resumes;
  }
  if (action.input.function === "deleteResume") {
    const resumes = state.resumes;
    const userResume = resumes[action.caller];
    delete userResume[action.input.resume.id];
    resumes[action.caller] = userResume;
    state.resumes = resumes;
  }
  return { state };
}
