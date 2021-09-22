import { useForm } from "react-hook-form";
import { useState } from "react";

import BounceLoader from "react-spinners/BounceLoader";

export function Studentdisplay({ getStudents, studDisplay, loading }) {
  const { register, handleSubmit } = useForm();
  const [dis, setdis] = useState(false);

  const createStudentReq = (v, e) => {
    console.log("new student created!!!", v);
    setdis(true);
    fetch("https://mentor-assign-task2.herokuapp.com/students/addstudent", {
      method: "POST",
      headers: {
        //header to add custom user to mock API
        "Content-Type": "application/json"
      },
      body: JSON.stringify(v)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "post success");
        getStudents();
        alert(`new student (${data.name}) created successfully`);
        e.target.reset();
      })
      .catch((err) => alert("create student request failed"));
  };

  return (
    <>
      <h2>
        <img src={require("../icons/students.png").default} alt="" />
        Students Page
      </h2>
      {loading ? (
        <div className="loadingDiv">
          <BounceLoader color={"red"} loading={loading} size={75} />
        </div>
      ) : (
        ""
      )}

      <div id="studentDiv">
        <div id="studentList">
          {studDisplay.map((v, i) => {
            return (
              <div className="card" key={v.name}>
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

        <div id="studentCreate">
          <h3>CREATE STUDENT</h3>
          <form onSubmit={handleSubmit(createStudentReq)}>
            <label>Student Name</label>
            <input
              type="text"
              {...register("name")}
              autoComplete="off"
              required
            ></input>

            <input type="submit" value="ADD" disabled={dis}></input>
          </form>
          <button className="re" onClick={() => setdis(false)}>
            one more
          </button>
        </div>
      </div>
    </>
  );
}
