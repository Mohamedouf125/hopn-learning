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
];


export const courseFormData = () => [
  { title: "full_name", placeholder: "name" },
  { title: "whatsapp_number", placeholder: "whatsapp number" },
];