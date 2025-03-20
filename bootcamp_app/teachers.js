const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests on teachers.id = teacher_id
  JOIN students on students.id = assistance_requests.student_id
  JOIN cohorts on cohorts.id = students.cohort_id
  WHERE cohorts.name = '${process.argv[2] || "JUL02"}'
  GROUP BY teacher, cohort;
  `
  )
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch((err) => console.error("query error: ", err.stack));
