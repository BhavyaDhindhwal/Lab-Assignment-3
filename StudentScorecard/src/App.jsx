import { useState, useEffect } from "react";
import Header from "./Components/Header";
import StudentTable from "./Components/StudentTable";
import AddStudentForm from "./Components/AddStudentForm";
import "./App.css";

function App() {
  // Load students from localStorage
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Aman", score: 55 },
      { id: 2, name: "Riya", score: 35 },
      { id: 3, name: "Karan", score: 75 },
    ];
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const updateScore = (id, newScore) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, score: Number(newScore) } : s
      )
    );
  };

  const addStudent = (name, score) => {
    const newStudent = {
      id: students.length + 1,
      name,
      score: Number(score),
    };
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Sorting
  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "score") return b.score - a.score;
    return 0;
  });

  // Search filter
  const filteredStudents = sortedStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const average =
    students.reduce((sum, s) => sum + s.score, 0) / students.length;
  const highest = students.reduce(
    (max, s) => (s.score > max ? s.score : max),
    0
  );

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortBy("name")}>Sort by Name</button>
        <button onClick={() => setSortBy("score")}>Sort by Score</button>
      </div>

      <StudentTable
        students={filteredStudents}
        updateScore={updateScore}
        deleteStudent={deleteStudent}
        highest={highest}
      />

      <AddStudentForm addStudent={addStudent} />

      <div className="stats">
        <p>Average Score: {average.toFixed(2)}</p>
        <p>Highest Score: {highest}</p>
        <p>Pass Count: {students.filter((s) => s.score >= 40).length}</p>
        <p>Fail Count: {students.filter((s) => s.score < 40).length}</p>
      </div>
    </div>
  );
}

export default App;