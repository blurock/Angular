import React, { useState } from 'react';
import { Editor} from "ketcher-react";
import { Ketcher } from "ketcher-core";
import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import "ketcher-react/dist/index.css";
import Viewer from 'miew-react';
import { StrictMode } from 'react';
import SpeedButton from 'miew-react';

//const structServiceProvider = new StandaloneStructServiceProvider();

function App() {
	
	alert("app 1");
	
	const cmldata = "C1=CC=CC=C1";
	
	
//const [ketcher, setKetcher] = useState<Ketcher | null>(null);
//const [hasError, setHasError] = useState(false);
	alert("app 2");

  const handleExportCML = async () => {
	alert("handleExportCML");
	/*
    try {
      if (ketcher) {
        //const cml = await ketcher.getCml();
        //console.log('Molecule in CML format:', cml);
      }
    } catch (error) {
      console.error('Error exporting CML:', error);
    }
    */
  };
	alert("app 2");

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
        <div>Hello from React!</div>
       
  <StrictMode>
    <Viewer options={{ load: 'pc:propane' }} />
  </StrictMode>,

        </div>
      </div>
    </div>
  );
  
}
/*
                  <!-- Editor
            staticResourcesUrl={""}
            structServiceProvider={structServiceProvider}
            onInit={setKetcher}
            errorHandler={(message: string) => {console.error(message)}}
          / -->
*/
export default App;

