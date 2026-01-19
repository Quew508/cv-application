import { useState } from 'react';
import { Input } from './Input';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

type EducationItem = {
  school: string;
  title: string;
  date_of_study: string;
  date_of_completion: string;
  current_education: boolean;
}

type EducationalExperienceProps = {
  initialValues?: EducationItem[];
}

export function EducationalExperience({ initialValues }: EducationalExperienceProps = {}) {
  const [education, setEducation] = useState(
    initialValues && initialValues.length > 0
      ? initialValues.map(item => ({ ...item, id: crypto.randomUUID() }))
      : [{
        id: crypto.randomUUID(),
        school: "",
        title: "",
        date_of_study: "",
        date_of_completion: "",
        current_education: false,
      }]
  )

  const handleChange = (id: string, field: string, value: string) => {
    setEducation(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  const addEducation = () => {
    setEducation(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        school: "",
        title: "",
        date_of_study: "",
        date_of_completion: "",
        current_education: false,
      }
    ])
  }

  const removeEducation = (id: string) => {
    setEducation(prev => prev.filter(item => item.id !== id));
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(education);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEducation(items);
  }

  return (
    <>
      <h2>Educational Experience</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='educational_experience'>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {education.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {provided => (
                    <fieldset
                      key={item.id}
                      className='educational_experience'
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Input
                        input="input"
                        type="text"
                        label="School Name"
                        name={`school_name_${index + 1}`}
                        value={item.school}
                        onChange={e => handleChange(item.id, "school", e.target.value)}
                      />
                      <Input
                        input="input"
                        type="text"
                        label="Education/course name"
                        name={`title_of_study_${index + 1}`}
                        value={item.title}
                        onChange={e => handleChange(item.id, "title", e.target.value)}
                      />
                      <Input
                        input="input"
                        type="date"
                        label="Date of Study"
                        name={`date_of_study_${index + 1}`}
                        value={item.date_of_study}
                        onChange={e => handleChange(item.id, "date_of_study", e.target.value)}
                      />
                      {!item.current_education && (
                        <Input
                          input="input"
                          type="date"
                          label="Date of Completion"
                          name={`date_of_completion_${index + 1}`}
                          value={item.date_of_completion}
                          onChange={e => handleChange(item.id, "date_of_completion", e.target.value)}
                        />
                      )}
                      <Input
                        input='checkbox'
                        label='Current Education'
                        name={`current_education_${index + 1}`}
                        checked={item.current_education}
                        onChange={e => handleChange(item.id, "current_education", String((e.target as HTMLInputElement).checked))}
                      />
                      {education.length > 1 && (
                        <button type="button" className='removeBtn' onClick={() => removeEducation(item.id)}>Remove</button>
                      )}
                    </fieldset>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button type="button" className='addBtn' onClick={addEducation}>Add Education</button>
    </>
  )
}