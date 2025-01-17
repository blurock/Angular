import React, { useState } from 'react';
import { Editor, Ketcher } from "ketcher-react";
import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import "ketcher-react/dist/index.css";

const structServiceProvider = new StandaloneStructServiceProvider();

function App() {
  const [ketcher, setKetcher] = useState<Ketcher | null>(null);

  const handleExportCML = async () => {
    try {
      if (ketcher) {
        const cml = await ketcher.getCml();
        console.log('Molecule in CML format:', cml);
      }
    } catch (error) {
      console.error('Error exporting CML:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ketcher Molecule Editor</h1>
          <button 
            onClick={handleExportCML}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Export CML
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: '600px' }}>
          <Editor
            staticResourcesUrl={""}
            structServiceProvider={structServiceProvider}
            onInit={setKetcher}
          />
        </div>
      </div>
    </div>
  );
}

export default App;