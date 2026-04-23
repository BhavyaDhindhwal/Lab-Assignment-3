function StudentRow({ student, updateScore, deleteStudent, highest }) {
  const status = student.score >= 40 ? "Pass" : "Fail";
  const statusClass = student.score >= 40 ? "pass" : "fail";
  const highlightClass = student.score === highest ? "top-scorer" : "";

  return (
    <tr className={highlightClass}>
      <td>{student.name}</td>
      <td>
        <input
          type="number"
          value={student.score}
          onChange={(e) => updateScore(student.id, e.target.value)}
        />
      </td>
      <td className={statusClass}>{status}</td>
      <td>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </td>
    </tr>
  );
}
export default StudentRow;