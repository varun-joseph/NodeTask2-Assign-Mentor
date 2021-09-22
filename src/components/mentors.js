import { useForm } from "react-hook-form";
import { useState } from "react";

import BounceLoader from "react-spinners/BounceLoader";

export function Mentordisplay({ getMentors, mentorDisplay, loading }) {
  const { register, handleSubmit } = useForm();
  const [dis, setdis] = useState(false);
  const createMentorReq = (v, e) => {
    console.log("new mentor created!!!", v);
    setdis(true);
    fetch("https://mentor-assign-task2.herokuapp.com/mentors/addmentor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(v)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "post success");
        getMentors();
        alert(`new mentor (${data.name}) created successfully`);
        e.target.reset();
      })
      .catch((err) => {
        console.log("err in creating mentor ", err);
        alert("create mentor request failed");
      });
  };

  return (
    <>
      <h2>
        <img src={require("../icons/mentors.png").default} alt="" />
        Mentors Page
      </h2>
      {loading ? (
        <div className="loadingDiv">
          <BounceLoader color={"red"} loading={loading} size={75} />
        </div>
      ) : (
        ""
      )}

      <div id="mentorDiv">
        <div id="mentortList">
          <div>
            {mentorDisplay.map((v, i) => {
              return (
                <div className="card" key={v.name}>
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
        </div>

        <div id="mentortCreate">
          <form onSubmit={handleSubmit(createMentorReq)}>
            <h3>CREATE MENTOR</h3>
            Mentor Name
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
