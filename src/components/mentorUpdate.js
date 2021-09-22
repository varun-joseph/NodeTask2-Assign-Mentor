import { useState } from "react";

export function MentorUpdate({
  getStudents,
  studDisplay,
  getMentors,
  mentorDisplay
}) {
  const [studentlist, setstudentlist] = useState("none");

  const [editMentor, seteditMentor] = useState({});

  const [selectedstud, setselectedstud] = useState([]);

  const updatestudentlistReq = (v) => {
    console.log("mentor change alert!!!", v);

    //------assigning array of students to mentor ------

    fetch(
      `https://mentor-assign-task2.herokuapp.com/mentors/assignstudent/${v.name}`,
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
        console.log(data, "patch success");
        getMentors();
        alert(`students assigned for ${v.name} !!!`);
      })
      .catch((err) => {
        console.log("patch failed ", err.message);
        alert(`error in assigning students`);
      });

    //------ changing mentor name for student------

    selectedstud.map((e) => {
      console.log("ready for update", e);

      fetch(
        `https://mentor-assign-task2.herokuapp.com/students/mentorupdate/${e}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ mentorname: v.name })
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "patch success in student record");
          getStudents();
          alert(
            "students assigned successfully,check out students and mentors list for new changes"
          );
        })
        .catch((err) => {
          console.log("patch failed ", err.message);
        });

      return true;
    });
  };

  return (
    <>
      {editMentor.name ? (
        <div className="edit-card">
          <h2>
            {" "}
            <img src={require("../icons/mentor.png").default} alt="" />
            {editMentor.name}
          </h2>

          <h4> current students:</h4>

          {editMentor.students.length > 0 ? (
            editMentor.students.map((v, i) => {
              return (
                <li key={i}>
                  {i + 1 + ") "}
                  {v}
                </li>
              );
            })
          ) : (
            <li>no students assigned</li>
          )}

          <br></br>
          <h4>Choosen students:</h4>
          <div>
            {selectedstud.map((v, i) => {
              return (
                <>
                  <li key={i}>
                    {v}
                    <button
                      onClick={() =>
                        setselectedstud(selectedstud.filter((e) => e !== v))
                      }
                    >
                      X
                    </button>
                  </li>
                </>
              );
            })}
          </div>
          <button onClick={() => setstudentlist("block")}>
            Select students
          </button>
          <br></br>
          <br></br>
          <button
            onClick={() => {
              if (selectedstud.length > 0) {
                updatestudentlistReq({
                  name: editMentor.name,
                  students: selectedstud
                });
              }
            }}
            disabled={selectedstud ? false : true}
          >
            UPDATE
          </button>
        </div>
      ) : (
        <h1>CHOOSE A MENTOR TO ASSIGN STUDENTS</h1>
      )}

      <div id="availableStudentsList" style={{ display: studentlist }}>
        <h2>
          Unassigned Students
          <button onClick={() => setstudentlist("none")}>X</button>
        </h2>

        {studDisplay
          .filter((e) => e.mentorname === undefined || e.mentorname.length < 1)
          .map((v, i) => {
            return (
              <div
                className="card"
                key={v.name}
                onClick={() => {
                  setselectedstud([...selectedstud, v.name]);
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

      <div id="updateMentorList">
        <h2>Available mentors</h2>

        {mentorDisplay.map((v, i) => {
          return (
            <div
              className="card"
              key={v.name}
              onClick={() => {
                seteditMentor(v);
              }}
            >
              <div className="card1">
                <img src={require("../icons/mentor.png").default} alt="" />
                <span>{i + 1}</span>
              </div>

              <div className="card2">
                Mentor:<br></br>
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
    </>
  );
}
