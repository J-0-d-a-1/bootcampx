const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests on teachers.id = teacher_id
  JOIN students on students.id = assistance_requests.student_id
  JOIN cohorts on cohorts.id = students.cohort_id
  WHERE cohorts.name = $1
  GROUP BY teacher, cohort;
  `;

const cohortName = process.argv[2] || "JUL02";
const values = [`${cohortName}`];

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch((err) => console.error("query error: ", err.stack));
