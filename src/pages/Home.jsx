import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Layout } from "antd";
import styles from "./Home.css";
import "antd/dist/antd.css";
import Chart from 'react-apexcharts';
import Input from "antd/lib/input/Input";

const { Content } = Layout;

const BaseUrl = "http://localhost:4001/";

const studentColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Skills",
    dataIndex: "skills",
    key: "skills",
    render: (skills) => (
      <div style={{ display: "flex" }}>
        {skills && skills.map((skill) => (
          <p style={{ marginRight: "10px" }}>{skill}</p>
        ))}
      </div>
    ),
  },
  {
    title: "Batch Year",
    dataIndex: "yearOfbatch",
    key: "yearOfbatch",
  },
  {
    title: "College",
    dataIndex: "collegeId",
    key: "collegeId",
    render: (college) => <p>{college?.name}</p>,
  },
];

const collegeColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Courses",
    dataIndex: "courses",
    key: "courses",
    render: (courses) => (
      <div style={{ display: "flex" }}>
        {courses.map((course) => (
          <p style={{ marginRight: "10px" }}>{course}</p>
        ))}
      </div>
    ),
  },
  {
    title: "Number Of Students",
    dataIndex: "numberOfStudents",
    key: "numberOfStudents",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Year Founded",
    dataIndex: "yearFounded",
    key: "yearFounded",
  },
];

const Home = () => {
  const [students, setStudents] = useState();
  const [colleges, setColleges] = useState();

  const [stateWiseCollegeData, setstateWiseCollegeData] = useState();
  const [courseWiseCollegeData, setcourseWiseCollegeData] = useState();
  const [collegeSearchValue, setcollegeSearchValue] = useState();

  useEffect(() => {
    loadColleges();
    loadStudents();
  }, []);

  useEffect(() => {
console.log( students);

    if(colleges){
        let clgData = {}
        colleges.map(college=> {
            if(clgData[college.state]===undefined){
                clgData[college.state]=1
            }else{
                clgData[college.state]=parseInt(clgData[college.state])+1
            }
        })

        setstateWiseCollegeData(clgData);

        clgData = {
            "CS": 0,
            "ME":0,
            "EEE": 0,
            "IT":0,
            "ECE":0,
            "Business": 0,
            "Management":0
        }
        colleges.map(college=> {
            college.courses.map(course=>{
                clgData[course]=parseInt(clgData[course])+1;
            })
        })

        setcourseWiseCollegeData(clgData)
    }
  }, [colleges, students]);


//   useEffect(()=> {
//     if(colleges.length<1 && collegeSearchValue){
//         loadColleges()
//     }
//     if(!students){
//         loadStudents()
//     }
//   }, [colleges, students])

  const loadStudents = async () => {
    const { data } = await axios.get(BaseUrl + "students/");
    setStudents(data);
  };

  const loadColleges = async () => {
    const { data } = await axios.get(BaseUrl + "colleges/");
    setColleges(data);
  };

  return (
    <div style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: "20px" }}>
      <Layout>
        <Content
          className={styles.Content}
          style={{
            backgroundColor: "#FFF9F8",
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingTop: "20px",
            overflow: "visible !important",
          }}
        >
          <div id="college" className={styles.TableHeaderContainer} style={{}}>
            <h3
              className={styles.TableHeader}
              style={{ color: "red", fontWeight: 600 }}
            >
              Colleges
            </h3>
          </div>
          <div style={{marginTop: "20px", marginBottom: "20px"}}>
            <Input placeholder="Filter by name" value={collegeSearchValue} onChange={(e)=> {
                if(!e.target.value){
                    loadColleges();
                }
                return setColleges(colleges=> colleges.filter(college=> college.name.toLowerCase().includes(e.target.value.toLowerCase())))
            }}/>
          </div>
          <div className={styles.TableContainer} style={{}}>
            <Table
              style={{ border: "1px solid black" }}
              className={styles.TableLayout}
              dataSource={colleges}
              columns={collegeColumns}
            />
          </div>

          <div
            id="student"
            className={styles.TableHeaderContainer}
            style={{ marginTop: "50px" }}
          >
            <h3
              className={styles.TableHeader}
              style={{ color: "red", fontWeight: 600 }}
            >
              Students
            </h3>
          </div>
          <div style={{marginTop: "20px", marginBottom: "20px"}}>
            <Input placeholder="Filter by name or college" value={collegeSearchValue} onChange={(e)=> {
                if(!e.target.value){
                    loadStudents();
                }
                return setStudents(students=> students.filter(student=> { if(student.name.toLowerCase().includes(e.target.value.toLowerCase()) || student?.collegeId?.name.toLowerCase().includes(e.target.value.toLowerCase())) return student}))
            }}/>
          </div>
          <div className={styles.TableContainer} style={{}}>
            <Table
              style={{ border: "1px solid black" }}
              className={styles.TableLayout}
              dataSource={students}
              columns={studentColumns}
            />
          </div>

          <div id="chart" style={{ marginTop: "50px" }}>
            <div id="state-wise-college">
              {stateWiseCollegeData && <Chart
                type="donut"
                width={849}
                height={450}
                series={Object.entries(stateWiseCollegeData).map(data=> data[1])}
                options={{
                  labels: Object.entries(stateWiseCollegeData).map(data=> data[0]),
                  title: {
                    text: "State Wise Colleges",
                    // align:"center",
                  },

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            showAlways: true,
                            //formatter: () => '343',
                            fontSize: 30,
                            color: "#f90000",
                          },
                        },
                      },
                    },
                  },

                  dataLabels: {
                    enabled: true,
                  },
                }}
              />}
            </div>

            <div id="state-wise-college" style={{marginTop: "150px"}}>
              {courseWiseCollegeData && <Chart
                type="donut"
                width={849}
                height={450}
                series={Object.entries(courseWiseCollegeData).map(data=> data[1])}
                options={{
                  labels: Object.entries(courseWiseCollegeData).map(data=> data[0]),
                  title: {
                    text: "Course Wise Colleges",
                  },

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            showAlways: true,
                            fontSize: 30,
                            color: "#f90000",
                          },
                        },
                      },
                    },
                  },

                  dataLabels: {
                    enabled: true,
                  },
                }}
              />}
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
