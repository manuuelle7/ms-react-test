import { useState } from 'react';
import './App.css';
import TreeOutput from './components/tree-output/TreeOutput';
import TreeJson from './components/tree-json/TreeJson';
import TreeSource from './components/tree-source/TreeSource';
import { BinTreeNode } from './models/BinTreeNode';

function App() {
  const [inputValue, setInputValue] = useState<string>();
  const [outputValue, setOutputValue] = useState<BinTreeNode>();
  const [smallValue, setSmallValue] = useState<BinTreeNode>();
  return (
    <div className="App">
      <h2> Process the input into a tree </h2>
        
        <TreeSource 
          treeState={setInputValue} 
          smallValueState={setSmallValue} 
          treeOutput={setOutputValue}/>
        <TreeJson 
          treeText={inputValue} 
          binTreeNode={outputValue} 
          treeState={setInputValue} 
          treeOutput={setOutputValue} 
          smallValueState={setSmallValue}/>
        <TreeOutput 
          treeText={inputValue} 
          binTreeNode={outputValue} 
          smallValue={smallValue}/>
      </div>
  );
}

export default App;
