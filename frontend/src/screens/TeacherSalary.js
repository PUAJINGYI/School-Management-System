import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTeachers, PaySalary } from "../actions/teacherActions";
import { TEACHER_SALARY_RESET } from "../constants/teacherConstants";
import { Button, Input } from "@chakra-ui/react";
import Select from "react-select";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Student.css";

const TeacherSalary = ({ history }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachername, setTeachername] = useState("");
  const [id, setId] = useState("");
  const [valid, setValid] = useState(false);
  const [year, setYear] = useState("");
  const [salary, setSalary] = useState("");
  const [month, setMonth] = useState(null);
  const [selectedTeacherError, setSelectedTeacherError] = useState(false);
  const [monthError, setMonthError] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  // const userLogin = useSelector((state) => state.userLogin)

  const { userCred } = userLogin;

  // const studentRegister = useSelector((state) => state.studentRegister)
  const teacherSalary = useSelector((state) => state.teacherSalary);
  const { loading, success, error } = teacherSalary;

  const teacherList = useSelector((state) => state.teacherList);
  const { loading: loadingTeacher, teachers } = teacherList;

  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.teacherId,
    label: teacher.teacher_name,
  }));

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  useEffect(() => {
    dispatch(listTeachers());
    dispatch({
      type: TEACHER_SALARY_RESET,
    });
    if (!userCred) {
      history.push("/login");
    }
  }, [userCred, history]);

  useEffect(() => {
    let timer;
    if (valid) {
      timer = setTimeout(() => {
        setValid(false);
      }, 10000);
    }
  
    return () => clearTimeout(timer);
  }, [valid]);

  const submitHandler = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!selectedTeacher) {
      setSelectedTeacherError(true);
      isValid = false;
    } else {
      setSelectedTeacherError(false);
    }

    if (!month) {
      setMonthError(true);
      isValid = false;
    } else {
      setMonthError(false);
    }

    if (isValid) {
      dispatch(PaySalary(teachername.trim(), id, year, month.value, salary));
      setTeachername("");
      setSelectedTeacher(null);
      setId("");
      setYear("");
      setSalary("");
      setMonth(null);
      setValid(true);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedTeacher(selectedOption);
    setId(selectedOption.value);
    setTeachername(selectedOption.label);

    const selectedTeacherData = teachers.find(
      (teacher) => teacher.teacherId === selectedOption.value
    );

    if (selectedTeacherData && selectedTeacherData.estimated_salary) {
      setSalary(selectedTeacherData.estimated_salary.toString());
    }
  };

  return (
    <div className="container1" style={{ marginTop: "10px" }}>
      <div className="outer-layout">
        <h1>Teacher Salary Section</h1>
        {valid && success && (
          <Message variant="success" message={success.message} />
        )}
        {valid && error && <Message variant="danger" message={error} />}
        {monthError && <Message variant="danger" message={"Month is required"} />}
        {selectedTeacherError && <Message variant="danger" message={"Teacher name is required"} />}

        {loadingTeacher ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <div className="form-control">
                <label for="name">Teacher Name</label>
                <Select
                  options={teacherOptions}
                  onChange={handleSelectChange}
                  value={selectedTeacher}
                  isSearchable
                  placeholder="Select Teacher"
                />
              </div>
              <div className="form-control">
                <label for="name">Teacher ID</label>
                <Input
                  type="number"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  readOnly
                  required
                />
              </div>
              <div className="form-control">
                <label for="year">Salary for Year</label>
                <Input
                  type="string"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>{" "}
              <div className="form-control">
                <label for="name">Salary for Month</label>
                <Select
                  options={monthOptions}
                  onChange={(selectedOption) => setMonth(selectedOption)}
                  isSearchable={false}
                  placeholder="Select Month"
                  value={month}
                />
              </div>{" "}
              <div className="form-control">
                <label for="name">Salary Amount</label>
                <Input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>{" "}
              {/* <div className="register-btn"> */}
              {/* </div> */}
            </div>

            <Button
              height={"auto"}
              className="btn-register"
              type="submit"
              colorScheme="whatsapp"
            >
              Pay Now
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherSalary;
