import React, { useState, useContext, Fragment } from 'react'
import { FirebaseContext } from "../context/firebase";

function CreateEntry() {
  const [text, setText] = useState(null);
  const [showButton, setShowButton] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const handleChange = (e) => {
    setText(e.target.value)
    if (e.target.value.length > 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }

  const handleUpload = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection('pastebox')
      .doc()
      .set({
        text,
        createdAt: Date.now()
      })
      .then(() => {
        setTimeout(() => {
          setUploaded(true);
          setLoading(false);
          window.location.reload();
        }, 500)
      })
      .catch(err => {
        setLoading(false);
        console.log(err)
      });
  }

  return (
    <Fragment>
      <div className="p-10 bg-white">
        <h2 className="text-3xl mb-3">Enter your message below...</h2>
        <p>Once submitted anyone with the generated URL will be able to access your message.</p>

        <textarea
          className="block w-full h-72 p-4 border-solid border-4 border-light-blue-500 mt-8 focus:outline-none focus:ring focus:border-blue-100"
          onChange={(e) => handleChange(e)}
        />

        {showButton && (
          <button
            className="bg-blue-500 mt-6 hover:bg-blue-600 text-white text-xl font-bold py-4 px-8"
            onClick={handleUpload}
          >
            {loading ? 'Uploading...' : (uploaded ? 'Uploaded' : 'Upload')}
          </button>
        )}
      </div>
    </Fragment>
  );
}

export default CreateEntry;
