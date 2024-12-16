import { useState } from "react";
import "./index.css";

const feeStructure = {
  "Exam Fee": {
    INDIAN: {
      ALL_COURSES: {
        ALL_LEVEL: { amount: 400 },
      },
    },
    FOREIGN: {
      ALL_COURSES: {
        ALL_LEVEL: { amount: 100 },
      },
    },
    NRI: {
      ALL_COURSES: {
        ALL_LEVEL: { amount: 600 },
      },
    },
    SAARC: {
      ALL_COURSES: {
        ALL_LEVEL: { amount: 600 },
      },
    },
  },
  "Application Fee": {
    INDIAN: {
      ALL_COURSES: {
        UG: { amount: 200 },
        "UG-DIPLOMA": { amount: 300 },
        PG: { amount: 500 },
      },
    },
    FOREIGN: {
      ALL_COURSES: {
        UG: { amount: 400 },
        "UG-DIPLOMA": { amount: 400 },
        PG: { amount: 700 },
      },
    },
  },
};

const courses = ["Medical", "Dental", "Ayurveda"];
const levels = ["UG", "PG", "DIPLOMA", "Ph.D"];

const FeeCalculator = () => {
  const [step, setStep] = useState(1);
  const [feeType, setFeeType] = useState("");
  const [nationality, setNationality] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [fee, setFee] = useState(null);

  const reset = () => {
    setStep(1);
    setFeeType("");
    setNationality("");
    setCourse("");
    setLevel("");
    setFee(null);
  };

  const selectFeeType = (type) => {
    setFeeType(type);
    setStep(2);
  };

  const selectNationality = (nation) => {
    setNationality(nation);
    setStep(3);
  };

  const selectCourse = (selectedCourse) => {
    setCourse(selectedCourse);
    setStep(4);
  };

  const selectLevel = (selectedLevel) => {
    setLevel(selectedLevel);

    const courseData =
      feeStructure[feeType][nationality][
        course === "ALL_COURSES" ? "ALL_COURSES" : course
      ] || {};

    const amount =
      courseData[selectedLevel]?.amount ||
      courseData["ALL_LEVEL"]?.amount ||
      courseData?.amount ||
      "Fee not available";

    setFee(amount);
    setStep(5);
  };

  return (
    <>
      <h1>Fee Calculator</h1>

      {step === 1 && (
        <>
          <h2>Select Fee Type</h2>
          {Object.keys(feeStructure).map((type) => (
            <button key={type} onClick={() => selectFeeType(type)}>
              {type}
            </button>
          ))}
        </>
      )}

      {step === 2 && (
        <>
          <h2>Select Nationality</h2>
          {Object.keys(feeStructure[feeType]).map((nation) => (
            <button key={nation} onClick={() => selectNationality(nation)}>
              {nation}
            </button>
          ))}
        </>
      )}

      {step === 3 && (
        <>
          <h2>Select Course</h2>
          {Object.keys(feeStructure[feeType][nationality]).includes(
            "ALL_COURSES"
          )
            ? courses.map((id) => (
                <button key={id} onClick={() => selectCourse("ALL_COURSES")}>
                  {id}
                </button>
              ))
            : Object.keys(feeStructure[feeType][nationality]).map((id) => (
                <button key={id} onClick={() => selectCourse(id)}>
                  {id}
                </button>
              ))}
        </>
      )}

      {step === 4 && (
        <>
          <h2>Select Level</h2>
          {Object.keys(
            feeStructure[feeType][nationality][
              course === "ALL_COURSES" ? "ALL_COURSES" : course
            ]
          ).includes("ALL_LEVEL")
            ? levels.map((lvl) => (
                <button key={lvl} onClick={() => selectLevel(lvl)}>
                  {lvl}
                </button>
              ))
            : Object.keys(
                feeStructure[feeType][nationality][
                  course === "ALL_COURSES" ? "ALL_COURSES" : course
                ]
              ).map((lvl) => (
                <button key={lvl} onClick={() => selectLevel(lvl)}>
                  {lvl}
                </button>
              ))}
        </>
      )}

      {step === 5 && (
        <>
          <h2>Fee Amount</h2>
          <p>{fee}</p>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </>
  );
};

export default FeeCalculator;
c;
