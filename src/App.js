import './App.css';
import { db } from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [testData, setTestData] = useState([]);
  useEffect(() => {
    let data = [];
    db.collection('test')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        })
      })
      .then(() => {
        setTestData(data);
      })
  }, []);

  return (
    <div className="App">
      {testData.map((dataObj, index) => (
        <p key={dataObj.testData + index}>{dataObj.testData}</p>
      ))}
    </div>
  );
}

export default App;
