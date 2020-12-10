import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment';
import { Route, BrowserRouter as Router, NavLink } from 'react-router-dom'
import { FirebaseContext } from "./context/firebase";
import CreateEntry from './views/CreateEntry';
import ViewEntry from './views/ViewEntry';

function App() {
  const [docs, setDocs] = useState(null);
  const { firebase } = useContext(FirebaseContext);

  function getDocs() {
    firebase
      .firestore()
      .collection('pastebox')
      .get()
      .then((res) => {
        setDocs(res.docs);
      })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {
    if (docs <= 0) {
      getDocs();
    }
  });

  return (
    <Router>
      <main className="w-11/12 md:w-8/12 mx-auto mt-12 pb-12">
        <Route path="/" exact component={CreateEntry} />
        <Route path="/:id" component={ViewEntry} />

        <h2 className="mt-12 text-2xl mb-4 text-white">Public Uploads</h2>

        <div className="grid gap-4 md:grid-cols-3 mt-2">
          {docs?.map((doc) => {
            return (
              <NavLink key={doc.id} to={doc.id} className="p-6 bg-white text-xl flex flex-col">
                <p className="flex-1">{doc.data().text.length > 10 ? doc.data().text.substring(0, 140) + "..." : doc.data().text}</p>
                <time className="mt-8 block opacity-40">
                  {moment(doc?.data().createdAt).format('LLL')}
                </time>
              </NavLink>
            )
          })}
        </div>
      </main>
    </Router>
  );
}

export default App;
