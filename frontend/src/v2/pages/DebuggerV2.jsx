import React from 'react';
import WorkspaceLayout from '../components/layout/WorkspaceLayout';
import CodeWorkspace from '../components/editor/CodeWorkspace';

const sampleCode = `async function fetchUsers() {
  const response = await fetch('https://api.example.com/users');
  // BUG: Not handling potential API failure properly
  const data = await response.json();
  return data;
}

async function displayUsers() {
  const users = await fetchUsers();
  
  // ERROR: users might be undefined if fetchUsers fails
  const userList = users.map(user => \`<li>\${user.name}</li>\`);
  
  document.getElementById('app').innerHTML = \`<ul>\${userList.join('')}</ul>\`;
}

displayUsers();
`;

export default function DebuggerV2() {
  return (
    <WorkspaceLayout>
      {/* The main workspace takes the full height minus whatever header we might want, but WorkspaceLayout handles the flex container */}
      <div className="h-full w-full bg-background">
        <CodeWorkspace initialCode={sampleCode} initialLanguage="javascript" />
      </div>
    </WorkspaceLayout>
  );
}
