import { spawn } from "child_process";
import "dotenv/config";

function runScript(script) {
  const child = spawn("node", [script], { stdio: "inherit" });

  child.on("exit", (code) => {
    console.log(`${script} exited with code ${code}`);
  });

  child.on("error", (err) => {
    console.error(`Failed to start ${script}:`, err);
  });

  return child;
}

runScript("main/scripts/server.mjs");
runScript("main/scripts/worker.mjs");
