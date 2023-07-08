import React, { useState, useEffect } from 'react';
import { fetchStudents } from '../providers/StudentProvider';
import { Student } from '../models/Student';

export function SampleStudentComponent() {
  const [data, setData] = useState<Student[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchStudents();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data.map((student) => (
        <p key={student.id}>
          {student.name} - {student.email} - {student.phone}
        </p>
      ))}
    </div>
  );
}
