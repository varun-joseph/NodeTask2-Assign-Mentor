import "./styles.css";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Studentdisplay } from "./components/students";
import { Mentordisplay } from "./components/mentors";

import { StudentUpdate } from "./components/studentUpdate";
import { MentorUpdate } from "./components/mentorUpdate";

export default function App() {
  const [mentorDisplay, setmentorDisplay] = useState([]);
  const [studDisplay, setstudDisplay] = useState([]);
  const [loading, setloading] = useState(false);

  // -------fetching all mentors using GET request ----------

  function getMentors() {
    fetch("https://mentor-assign-task2.herokuapp.com/mentors", {
      method: "GET",
      headers: {
        //   'Content-Type': 'application/json;charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setmentorDisplay(data);
        console.log("all mentors are fetched");
        setloading(false);
      })
      .catch((err) => console.log("err in fetching all mentors", err.message));
  }
  useEffect(() => {
    setloading(true);
    getMentors();
  }, []);

  // -------fetching all students using GET request ----------

  function getStudents() {
    fetch("https://mentor-assign-task2.herokuapp.com/students", {
      method: "GET",
      headers: {
        //   'Content-Type': 'application/json;charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setstudDisplay(data);
        setloading(false);
        console.log("all students are fetched");
      })
      .catch((err) => console.log("err in fetching all students", err.message));
  }

  useEffect(() => {
    setloading(true);
    getStudents();
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <div id="header">
            <h1>
              Mentor-Student Portal{" "}
              <img src={require("./icons/logo.png").default} alt="" />
              
            </h1>
          </div>
          <div id="navbar">
            <Link to="/students" className="linker">
              <span>Students</span>
            </Link>

            <Link to="/studentupdate" className="linker">
              <span>Update student</span>
            </Link>

            <Link to="/mentors" className="linker">
              <span>Mentors</span>
            </Link>

            <Link to="/mentorupdate" className="linker">
              <span>Update mentor</span>
            </Link>
          </div>

          <Switch>
            {/* -----route 1 for displaying all students ------ */}

            <Route path="/students">
              <Studentdisplay
                studDisplay={studDisplay}
                getStudents={getStudents}
                loading={loading}
                setloadi={setloading}
              />
            </Route>

            {/* -----route 2 for displaying all mentors ------ */}

            <Route path="/mentors">
              <Mentordisplay
                mentorDisplay={mentorDisplay}
                getMentors={getMentors}
                loading={loading}
                setloadig={setloading}
              />
            </Route>

            {/* -----route 3 for updating  students ------ */}

            <Route path="/studentupdate">
              <StudentUpdate
                studDisplay={studDisplay}
                getStudents={getStudents}
                mentorDisplay={mentorDisplay}
                getMentors={getMentors}
              />
            </Route>

            {/* -----route 4 for updating  mentors ------ */}

            <Route path="/mentorupdate">
              <MentorUpdate
                studDisplay={studDisplay}
                getStudents={getStudents}
                mentorDisplay={mentorDisplay}
                getMentors={getMentors}
              />
            </Route>

            <Route path="*">
              <Studentdisplay
                studDisplay={studDisplay}
                getStudents={getStudents}
                loading={loading}
                setloadi={setloading}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}
