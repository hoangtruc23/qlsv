import rootApi from './baseServices';

async function postUpdateGrades(student_class_id: string, process_score: number, midterm_score: number, final_score: number, updated_by: number) {
    const response = await fetch(`${rootApi}/update_grades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_class_id, process_score, midterm_score, final_score, updated_by }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export { postUpdateGrades }