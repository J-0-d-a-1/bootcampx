SELECT cohorts.name as cohort_name, count(students.*) as student_count
FROM students
JOIN cohorts ON cohorts.id = cohort_id
GROUP BY cohort_name
HAVING count(students.*) >= 18
ORDER BY count(students.*);