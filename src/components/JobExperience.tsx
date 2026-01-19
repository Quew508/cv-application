import { useState } from 'react';
import { Input } from './Input';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

type JobExperienceItem = {
  company_name: string;
  position_title: string;
  main_responsibilities: string;
  date_from: string;
  date_to: string;
  current_job: boolean;
}

type JobExperienceProps = {
  initialValues?: JobExperienceItem[];
}

export function JobExperience({ initialValues }: JobExperienceProps = {}) {
  const [jobExperience, setJobExperience] = useState(
    initialValues && initialValues.length > 0
      ? initialValues.map(item => ({ ...item, id: crypto.randomUUID() }))
      : [{
        id: crypto.randomUUID(),
        company_name: "",
        position_title: "",
        main_responsibilities: "",
        date_from: "",
        date_to: "",
        current_job: false,
      }]
  )

  const handleChange = (id: string, field: string, value: string | boolean) => {
    setJobExperience(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  const addJobExperience = () => {
    setJobExperience(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        company_name: "",
        position_title: "",
        main_responsibilities: "",
        date_from: "",
        date_to: "",
        current_job: false,
      }
    ])
  }

  const removeJobExperience = (id: string) => {
    setJobExperience(prev => prev.filter(item => item.id !== id));
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(jobExperience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setJobExperience(items);
  }

  return (
    <>
      <h2>Job Experience</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="job_experience">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {jobExperience.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {provided => (
                    <fieldset
                      key={item.id}
                      className='job_experience'
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Input
                        input="input"
                        type="text"
                        label="Company Name"
                        name={`company_name_${index + 1}`}
                        value={item.company_name}
                        onChange={e => handleChange(item.id, "company_name", e.target.value)}
                      />
                      <Input
                        input="input"
                        type="text"
                        label="Position of Title"
                        name={`position_title_${index + 1}`}
                        value={item.position_title}
                        onChange={e => handleChange(item.id, "position_title", e.target.value)}
                      />
                      <Input
                        input="textarea"
                        label="Main Responsibilities"
                        name={`main_responsibilities_${index + 1}`}
                        value={item.main_responsibilities}
                        onChange={e => handleChange(item.id, "main_responsibilities", e.target.value)}
                      />
                      <Input
                        input="input"
                        type="date"
                        label="Date of Employment"
                        name={`date_from_${index + 1}`}
                        value={item.date_from}
                        onChange={e => handleChange(item.id, "date_from", e.target.value)}
                      />
                      {!item.current_job && (

                        <Input
                          input="input"
                          type="date"
                          label="Last Date of Employment"
                          name={`date_to_${index + 1}`}
                          value={item.date_to}
                          onChange={e => handleChange(item.id, "date_to", e.target.value)}
                        />
                      )}
                      <Input
                        input='checkbox'
                        label='Current Job'
                        name={`current_job_${index + 1}`}
                        checked={item.current_job}
                        onChange={e => handleChange(item.id, "current_job", (e.target as HTMLInputElement).checked)}
                      />
                      {jobExperience.length > 1 && (
                        <button type="button" className='removeBtn' onClick={() => removeJobExperience(item.id)}>Remove</button>
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
      <button type="button" className='addBtn' onClick={addJobExperience}>Add Job Experience</button>
    </>
  )
}