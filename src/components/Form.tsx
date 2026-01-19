import { GeneralInformation } from './GeneralInformation'
import { EducationalExperience } from './EducationalExperience'
import { JobExperience } from './JobExperience'

export function Form() {
  return (
    <form>
      <GeneralInformation />
      <EducationalExperience />
      <JobExperience />
    </form>
  )
}