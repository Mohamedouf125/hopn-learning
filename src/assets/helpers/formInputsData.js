export const editForm = (user) => [
  {
    title: "name",
    value: user.name,
  },
  {
    title: "email",
    value: user.email,
  },
  {
    title: "phone",
    value: user.phone,
  },
  {
    title: "job",
    value: user.job,
  },
  {
    title: "address",
    value: user.address,
  },
  {
    title:"age",
    value: user.age,
  },{
    title: "qualification",
    value: user.qualification,
  }
];


export const courseFormData = () => [
  { title: "full_name", placeholder: "name" },
  { title: "whatsapp_number", placeholder: "whatsapp number" },
];

export const CvFormData = () => [
  { title: "whatsnumber", placeholder: "whatsapp number" },
  { title: "job", placeholder: "Job" },
  { title: "residence", placeholder: "address" },
  { title: "about_you", placeholder: "About you" },
  { title: "age", placeholder: "Age" },
];