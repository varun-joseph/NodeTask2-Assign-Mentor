import { useState } from "react";

export function StudentUpdate({
  getStudents,
  studDisplay,
  getMentors,
  mentorDisplay
}) {
  const [mentor, setmentor] = useState("");
  const [editStudent, seteditStudent] = useState({});

  const [mentorlist, setmentorlist] = useState("none");

  //-------------- UPDATING MENTOR FOR A STUDENT (PATCH REQUEST)------------

  const updateMentorReq = (v, o, n) => {
    console.log("mentor change for a student alert!!!", v);

    //-----changing mentor name for a student -------

    fetch(
      `https://mentor-assign-task2.herokuapp.com/students/mentorupdate/${v.name}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(v)
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patch success for assigning new mentor");
        getStudents();
        arralter();
        alert(`new mentor assigned for ${data.name} !!!`);
      })
      .catch((err) => {
        console.log("patch failed ", err.message);
        alert("error in assigning new mentor");
      });

    console.log("changing student array starts alert !!! from", o, "to", n);
    console.log([v.name]);

    function arralter() {
      //----- removing the student from old mentor  student list -------
      if (o) {
        fetch(
          `https://mentor-assign-task2.herokuapp.com/mentors/pullstud/${o}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ students: [v.name] })
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(
              data,
              "patch success for pulling in  student array in mentor"
            );
            setmentor("");
            getMentors();
            getStudents();
          })
          .catch((err) => {
            console.log(
              "patch failed for pulling in  student array in mentor",
              err.message
            );
          });
      }

      //----- adding the student in new mentor  student list -------

      fetch(`https://mentor-assign-task2.herokuapp.com/mentors/pushstud/${n}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ students: [v.name] })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(
            data,
            "patch success for pushing in  student array in mentor"
          );
          setmentor("");
          getMentors();
          getStudents();
          alert(
            "mentor change successful, check out the mentors and student list for new changes"
          );
        })
        .catch((err) => {
          console.log(
            "patch failed for pushing in  student array in mentor",
            err.message
          );
        });
    }
  };

  return (
    <>
      {editStudent.name ? (
        <div className="edit-card">
          <h2>
            {" "}
            <img src={require("../icons/student.png").default} alt="" />
            {editStudent.name}
          </h2>
          <h4>
            current mentor:
            <span>
              {" "}
              {editStudent.mentorname
                ? editStudent.mentorname
                : "mentor not assigned"}
            </span>
          </h4>
          <h4>
            selected mentor:<span>{mentor ? mentor : "pick from list"}</span>
          </h4>
          <button onClick={() => setmentorlist("block")}> Select mentor</button>
          <br></br>
          <br></br>

          <button
            onClick={() => {
              var oldMentor = editStudent.mentorname;
              var newMentor = mentor;
              // setoldmentor(editStudent.mentorname);
              // setnewmentor(mentor);
              updateMentorReq(
                { name: editStudent.name, mentorname: mentor },
                oldMentor,
                newMentor
              );
            }}
            disabled={mentor ? false : true}
          >
            UPDATE
          </button>
        </div>
      ) : (
        <h1>CHOOSE A STUDENT TO UPDATE MENTOR</h1>
      )}

      <div id="availableMentorsList" style={{ display: mentorlist }}>
        <h2>
          Available Mentors{" "}
          <button onClick={() => setmentorlist("none")}>X</button>
        </h2>

        {mentorDisplay.map((v, i) => {
          return (
            <div
              className="card"
              key={v.name}
              onClick={() => {
                setmentor(v.name);
              }}
            >
              <div className="card1">
                <img src={require("../icons/mentor.png").default} alt="" />
                <span>{i + 1}</span>
              </div>

              <div className="card2">
                mentor:<br></br>
                <span>{v.name}</span>
              </div>
              <div className="card3">
                Students count:
                <span>{v.students.length}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div id="updateStudentList">
        <h2>Registered Students</h2>

        {studDisplay.map((v, i) => {
          return (
            <div
              className="card"
              key={v.name}
              onClick={() => {
                seteditStudent(v);
                // setmentor(v.mentorname);
              }}
            >
              <div className="card1">
                <img src={require("../icons/student.png").default} alt="" />
                <span>{i + 1}</span>
              </div>
              <div className="card2">
                Student:<br></br>
                <span>{v.name}</span>
              </div>
              <div className="card3">
                Mentor:<br></br>
                <span>
                  {v.mentorname ? v.mentorname : "mentor not assigned"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
