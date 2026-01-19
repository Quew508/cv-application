import './styles/App.css';
import { useLocalStorage } from './components/useLocalStorage';
import { GeneralInformation } from './components/GeneralInformation'
import { EducationalExperience } from './components/EducationalExperience'
import { JobExperience } from './components/JobExperience'

type FormDataType = {
  fname: string;
  sname: string;
  email: string;
  address: string;
  dob: string;
  gender: string;
  race: string;
  marital_status: string;
  nationality: string;
  country_of_origin: string;
  country_of_residence: string;
  cnumber: string;
  education: Array<{
    school: string;
    title: string;
    date_of_study: string;
    date_of_completion: string;
    current_education: boolean;
  }>;
  jobExperience: Array<{
    company_name: string;
    position_title: string;
    main_responsibilities: string;
    date_from: string;
    date_to: string;
    current_job: boolean;
  }>;
}

export function App() {
  const [isSubmitted, setIsSubmitted] = useLocalStorage('isSubmitted', false)
  const [formData, setFormData] = useLocalStorage('formData', null)
  const [editMode, setEditMode] = useLocalStorage('editMode', {
    generalInfo: false,
    education: false,
    jobExperience: false
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Extract general information
    const generalInfo = {
      fname: data.get('fname') as string,
      sname: data.get('sname') as string,
      email: data.get('email') as string,
      address: data.get('address') as string,
      dob: (data.get('dob') as string) ?? "",
      cnumber: data.get('cnumber') as string,
      gender: data.get('gender') as string,
      race: data.get('race') as string,
      marital_status: data.get('marital_status') as string,
      nationality: data.get('nationality') as string,
      country_of_origin: data.get('country_of_origin') as string,
      country_of_residence: data.get('country_of_residence') as string,
    }

    //Extract educational experience
    const education = []
    let eIndex = 1
    while (data.get(`school_name_${eIndex}`)) {
      education.push({
        school: data.get(`school_name_${eIndex}`) as string,
        title: data.get(`title_of_study_${eIndex}`) as string,
        date_of_study: data.get(`date_of_study_${eIndex}`) as string,
        date_of_completion: data.get(`date_of_completion_${eIndex}`) as string,
        current_education: data.get(`current_education_${eIndex}`) === 'on',
      })
      eIndex++
    }

    // Extract job experience (find all company_name fields to determine count)
    const jobExperience = []
    let index = 1
    while (data.get(`company_name_${index}`)) {
      jobExperience.push({
        company_name: data.get(`company_name_${index}`) as string,
        position_title: data.get(`position_title_${index}`) as string,
        main_responsibilities: data.get(`main_responsibilities_${index}`) as string,
        date_from: data.get(`date_from_${index}`) as string,
        date_to: (data.get(`date_to_${index}`) as string) ?? "",
        current_job: data.get(`current_job_${index}`) === 'on',
      })
      index++
    }

    setFormData({
      ...generalInfo,
      jobExperience,
      education,
    })
    setIsSubmitted(true)
  }

  return (
    <>
      <h1>CV Application</h1>
      {!isSubmitted ? (
        <section>
          <p>Fill in the following details to create your CV</p>
          <form onSubmit={handleSubmit}>
            <GeneralInformation />
            <EducationalExperience />
            <JobExperience />
            <button className='saveBtn' type='submit'>Submit</button>
          </form>
        </section>
      ) : (
        <section>
          {formData && (
            <>
              {editMode.generalInfo ? (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const data = new FormData(form)

                  setFormData(prev => prev ? {
                    ...prev,
                    fname: data.get('fname') as string,
                    sname: data.get('sname') as string,
                    email: data.get('email') as string,
                    address: data.get('address') as string,
                    cnumber: data.get('cnumber') as string,
                    gender: data.get('gender') as string,
                    race: data.get('race') as string,
                    marital_status: data.get('marital_status') as string,
                    nationality: data.get('nationality') as string,
                    country_of_origin: data.get('country_of_origin') as string,
                    country_of_residence: data.get('country_of_residence') as string,
                  } : null)
                  setEditMode(prev => ({ ...prev, generalInfo: false }))
                }}>
                  <section>
                    <GeneralInformation initialValues={{
                      fname: formData.fname,
                      sname: formData.sname,
                      email: formData.email,
                      address: formData.address,
                      dob: formData.dob,
                      cnumber: formData.cnumber,
                      gender: formData.gender,
                      race: formData.race,
                      marital_status: formData.marital_status,
                      nationality: formData.nationality,
                      country_of_origin: formData.country_of_origin,
                      country_of_residence: formData.country_of_residence
                    }} />
                    <button className='saveBtn' type='submit'>Save</button>
                  </section>
                </form>
              ) : (
                <>
                  <h2>General Information</h2>
                  <fieldset>
                    <p>Name: {formData.fname} {formData.sname}</p>
                    <p>Email: {formData.email}</p>
                    <p>Address: {formData.address}</p>
                    <p>Date of Birth: {formData.dob}</p>
                    <p>Gender: {formData.gender}</p>
                    <p>Race: {formData.race}</p>
                    <p>Marital Status: {formData.marital_status}</p>
                    <p>Nationality: {formData.nationality}</p>
                    <p>Country of Origin: {formData.country_of_origin}</p>
                    <p>Country of Residence: {formData.country_of_residence}</p>
                    <p>Contact Number: {formData.cnumber}</p>
                    <button type='button' className='editBtn' onClick={() => setEditMode(prev => ({ ...prev, generalInfo: true }))}>Edit</button>
                  </fieldset>
                </>
              )}
              {editMode.education ? (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const data = new FormData(form)

                  const education: Array<{
                    school: string;
                    title: string;
                    date_of_study: string;
                    date_of_completion: string;
                    current_education: boolean;
                  }> = []
                  let eIndex = 1
                  while (data.get(`school_name_${eIndex}`)) {
                    education.push({
                      school: data.get(`school_name_${eIndex}`) as string,
                      title: data.get(`title_of_study_${eIndex}`) as string,
                      date_of_study: data.get(`date_of_study_${eIndex}`) as string,
                      date_of_completion: data.get(`date_of_completion_${eIndex}`) as string,
                      current_education: data.get(`current_education_${eIndex}`) === 'on',
                    })
                    eIndex++
                  }

                  setFormData(prev => prev ? { ...prev, education } : null)
                  setEditMode(prev => ({ ...prev, education: false }))
                }}>
                  <section>
                    <EducationalExperience initialValues={formData.education.length > 0 ? formData.education : undefined} />
                    <button className='saveBtn' type='submit'>Save</button>
                  </section>
                </form>
              ) : (
                <>
                  {formData.education.length > 0 && (
                    <>
                      <h2>Education</h2>
                      {formData.education.map((ed, index) => (
                        <section key={index}>
                          <fieldset>
                            <h3>Education {index + 1}</h3>
                            <p>School: {ed.school}</p>
                            <p>Title: {ed.title}</p>
                            <p>Date of Study: {ed.date_of_study}</p>
                            <p>Date of Completion: {ed.date_of_completion}</p>
                            {ed.current_education && <p>Current Education</p>}
                            {!ed.current_education && <p>Date of Completion: {ed.date_of_completion}</p>}
                          </fieldset>
                        </section>
                      ))}
                    </>
                  )}
                  <button type='button' className='editBtn' onClick={() => setEditMode(prev => ({ ...prev, education: true }))}>
                    {formData.education.length > 0 ? 'Edit Education' : 'Add Education'}
                  </button>
                </>
              )}
              {editMode.jobExperience ? (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const data = new FormData(form)

                  const jobExperience: Array<{
                    company_name: string;
                    position_title: string;
                    main_responsibilities: string;
                    date_from: string;
                    date_to: string;
                    current_job: boolean;
                  }> = []
                  let jIndex = 1
                  while (data.get(`company_name_${jIndex}`)) {
                    jobExperience.push({
                      company_name: data.get(`company_name_${jIndex}`) as string,
                      position_title: data.get(`position_title_${jIndex}`) as string,
                      main_responsibilities: data.get(`main_responsibilities_${jIndex}`) as string,
                      date_from: data.get(`date_from_${jIndex}`) as string,
                      date_to: (data.get(`date_to_${jIndex}`) as string) ?? "",
                      current_job: data.get(`current_job_${jIndex}`) === 'on',
                    })
                    jIndex++
                  }

                  setFormData(prev => prev ? { ...prev, jobExperience } : null)
                  setEditMode(prev => ({ ...prev, jobExperience: false }))
                }}>
                  <section>
                    <JobExperience initialValues={formData.jobExperience.length > 0 ? formData.jobExperience : undefined} />
                    <button className='saveBtn' type='submit'>Save</button>
                  </section>
                </form>
              ) : (
                <>
                  {formData.jobExperience.length > 0 && (
                    <>
                      <h2>Job Experience</h2>
                      {formData.jobExperience.map((job, index) => (
                        <section key={index}>
                          <fieldset>
                            <h3>Job {index + 1}</h3>
                            <p>Company: {job.company_name}</p>
                            <p>Position: {job.position_title}</p>
                            <p>Responsibilities: {job.main_responsibilities}</p>
                            <p>From: {job.date_from}</p>
                            {job.current_job && <p>Current Job</p>}
                            {!job.current_job && <p>To: {job.date_to}</p>}
                          </fieldset>
                        </section>
                      ))}
                    </>
                  )}
                  <button type='button' className='editBtn' onClick={() => setEditMode(prev => ({ ...prev, jobExperience: true }))}>
                    {formData.jobExperience.length > 0 ? 'Edit Job Experience' : 'Add Job Experience'}
                  </button>
                </>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
}
