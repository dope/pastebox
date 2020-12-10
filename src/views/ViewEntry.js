import React, { useEffect, Fragment, useState, useContext } from 'react'
import { FirebaseContext } from "../context/firebase";
import moment from 'moment';
import { NavLink } from 'react-router-dom';

function ViewEntry({ match }) {
  const { firebase } = useContext(FirebaseContext);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (doc <= 0) {
      firebase
        .firestore()
        .collection('pastebox')
        .doc(match.params.id)
        .get()
        .then((res) => {
          setDoc(res.data());
        })
        .catch(err => {
          console.log(err)
        });
    }
  }, [doc])

  return (
    <Fragment>
      <NavLink to="/" className="text-2xl mb-8 table text-white">← Go Back</NavLink>
      <div className="p-10 bg-white">
        <p>{doc?.text}</p>
        <time className="mt-8 block opacity-40">
          {moment(doc?.createdAt).format('LLL')}
        </time>
      </div>
    </Fragment>
  );
}

export default ViewEntry;
