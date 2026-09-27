import * as Y from 'yjs';
import { createAgentTools } from './tools/agentTools.js';

const ydoc = new Y.Doc();
const text = ydoc.getText('public/items.html');
text.insert(0, '<html></html>');

const tools = createAgentTools('mock-project', ydoc, null, null);
const list_directory = tools.find(t => t.name === 'list_directory');

(async () => {
  console.log(await list_directory.invoke({ directoryPath: '.' }));
})();
(async () => {
  console.log(await list_directory.invoke({ directoryPath: 'public' }));
})();
