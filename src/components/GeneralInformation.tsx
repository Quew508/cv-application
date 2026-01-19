import { useState } from 'react';
import { Input } from './Input'

type GeneralInfoProps = {
  initialValues?: {
    fname: string;
    sname: string;
    address: string;
    dob: string;
    gender: string;
    race: string;
    marital_status: string;
    nationality: string;
    country_of_origin: string;
    country_of_residence: string;
    email: string;
    cnumber: string;
  }
}

export function GeneralInformation({ initialValues }: GeneralInfoProps = {}) {
  const [generalInfo, setGeneralInfo] = useState(
    initialValues || {
      fname: "",
      sname: "",
      address: "",
      dob: "",
      gender: "",
      race: "",
      marital_status: "",
      nationality: "",
      country_of_origin: "",
      country_of_residence: "",
      email: "",
      cnumber: ""
    }
  )

  const genders = [
    "Male", "Female", "Other"
  ]

  const races = [
    "African", "Asian", "Caucasian", "Hispanic", "Middle Eastern", "Native American", "Pacific Islander", "Mixed", "Other"
  ]

  const maritalStatus = [
    "Single", "Married", "Divorced", "Widowed", "Separated"
  ]

  const nationalities = [
    "Afghan", "Albanian", "Algerian", "American", "Argentinian", "Australian", "Austrian", "Bangladeshi", "Belgian", "Brazilian", "British", "Canadian", "Chilean", "Chinese", "Colombian", "Cuban", "Danish", "Dutch", "Egyptian", "Ethiopian", "Filipino", "Finnish", "French", "German", "Greek", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Jamaican", "Japanese", "Kenyan", "Korean", "Malaysian", "Mexican", "Moroccan", "Nigerian", "Norwegian", "Pakistani", "Peruvian", "Polish", "Portuguese", "Russian", "Saudi", "Swedish", "Swiss", "Thai", "Turkish", "Ukrainian", "United Arab Emirates", "United Kingdom", "United States", "Uruguayan", "Vietnamese", "Other"
  ]

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe",
    "Other"
  ];

  return (
    <>
      <h2>General Information</h2>
      <fieldset className='general_information'>
        <Input input="input" type="text" label="First Name" name="fname" value={generalInfo.fname} onChange={e => setGeneralInfo(prev => ({ ...prev, fname: e.target.value }))} />
        <Input input="input" type="text" label="Surname Name" name="sname" value={generalInfo.sname} onChange={e => setGeneralInfo(prev => ({ ...prev, sname: e.target.value }))} />
        <Input input="input" type="text" label="Address" name="address" value={generalInfo.address} onChange={e => setGeneralInfo(prev => ({ ...prev, address: e.target.value }))} />
        <Input input="input" type="email" label="Email" name="email" value={generalInfo.email} onChange={e => setGeneralInfo(prev => ({ ...prev, email: e.target.value }))} />
        <Input input="input" type="tel" label="Contact Number" name="cnumber" value={generalInfo.cnumber} onChange={e => setGeneralInfo(prev => ({ ...prev, cnumber: e.target.value }))} />
        <Input input="input" type="date" label="Date of Birth" name="dob" value={generalInfo.dob} onChange={e => setGeneralInfo(prev => ({ ...prev, dob: e.target.value }))} />
        <Input input="select" label="Gender" name="gender" value={generalInfo.gender} onChange={e => setGeneralInfo(prev => ({ ...prev, gender: e.target.value }))} options={genders.map(gender => ({ value: gender, label: gender }))} />
        <Input input="select" label="Race" name="race" value={generalInfo.race} onChange={e => setGeneralInfo(prev => ({ ...prev, race: e.target.value }))} options={races.map(race => ({ value: race, label: race }))} />
        <Input input="select" label="Marital Status" name="marital_status" value={generalInfo.marital_status} onChange={e => setGeneralInfo(prev => ({ ...prev, marital_status: e.target.value }))} options={maritalStatus.map(status => ({ value: status, label: status }))} />
        <Input input="select" label="Nationality" name="nationality" value={generalInfo.nationality} onChange={e => setGeneralInfo(prev => ({ ...prev, nationality: e.target.value }))} options={nationalities.map(nationality => ({ value: nationality, label: nationality }))} />
        <Input input="select" label="Country of Origin" name="country_of_origin" value={generalInfo.country_of_origin} onChange={e => setGeneralInfo(prev => ({ ...prev, country_of_origin: e.target.value }))} options={countries.map(country => ({ value: country, label: country }))} />
        <Input input="select" label="Country of Residence" name="country_of_residence" value={generalInfo.country_of_residence} onChange={e => setGeneralInfo(prev => ({ ...prev, country_of_residence: e.target.value }))} options={countries.map(country => ({ value: country, label: country }))} />
      </fieldset>
    </>
  )
}