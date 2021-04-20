import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listStudents } from '../actions/studentActions'

const AllStudents = ({ match }) => {
  const dispatch = useDispatch()
  const studentList = useSelector((state) => state.studentList)
  const { loading, students, error } = studentList
  const matchid = match.params.id
  useEffect(() => {
    dispatch(listStudents())
  }, [dispatch])

  var i = 1

  const searchSubmit = (e) => {
    e.preventDefault()
    console.log('clicked')
  }
  // const students = []
  return (
    <div className='container3'>
      <div className='outer'>
        <input type='text' placeholder='Search for student...' />
        <span className='search-icon' onClick={searchSubmit}>
          <i className='fas fa-search'></i>
        </span>

        <div className='table-layout'>
          {loading ? (
            <h1>Loading ....</h1>
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>SN</th>
                  {/* <th>ID</th> */}
                  <th>Photo</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Address</th>
                  <th>Parent's Name</th>
                  <th>Contact No</th>
                  <th>Previous Dues</th>
                  <th>Gender</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* {match.params.id===data.id && */}
                {console.log(matchid)}
                {/* {"A"==="A" ?():(

)} */}
                {/* for displaying the information about the particular class
only we first should have the data of that class only 
. We cannot make selection inside the map method by using double and operator. */}
                {students.map((data) => (
                  <tr key={data._id} className='contents'>
                    <td>{i++}</td>
                    {/* <td>{data._id}</td> */}
                    <td>
                      <img style={{ height: '50px' }} src={data.image} alt='' />
                    </td>
                    <td>{data.student_name}</td>
                    <td>{data.class}</td>
                    <td>{data.roll_no}</td>
                    <td>{data.address}</td>
                    <td>{data.parents_name}</td>
                    <td>{data.contact_no}</td>
                    <td>{data.previous_dues}</td>
                    <td>{data.gender}</td>
                    <td>
                      <i
                        style={{
                          padding: '8px',
                          color: 'green',
                          fontSize: '25px',
                        }}
                        className='fas fa-user-edit'
                      ></i>
                    </td>
                    <td>
                      <i
                        style={{
                          padding: '8px',
                          color: 'red',
                          fontSize: '25px',
                        }}
                        className='fas fa-trash'
                      ></i>
                    </td>
                  </tr>

                  // }
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllStudents