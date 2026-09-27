const fs = require('fs');
const p = '/Users/purna/Desktop/temp_collab_code/collab_code/BackEnd/services/agentRunner.js';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/triggering a failing command\.\`;/, `triggering a failing command.\n\n3. INVESTIGATION & ANSWERING QUESTIONS:\n   - If the user asks you to "check why" something is happening, use the tools to read the code.\n   - ONCE YOU FIND THE CAUSE, IMMEDIATELY STOP CALLING TOOLS. Provide your final analysis directly to the user.\n   - Do NOT double-check the same file repeatedly. If you have the answer, output your response immediately to break the tool loop.\`;`);
fs.writeFileSync(p, c);
