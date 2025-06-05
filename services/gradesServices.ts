import rootApi from './baseServices';

export async function postUpdateGrades(student_class_id: number, process_score: string, midterm_score: string, final_score: string, updated_by: number) {
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


export const getGradeHistory = async (studentClassID: number) => {
    const response = await fetch(`${rootApi}/grades/history/${studentClassID}`);
    return response.json();
};
