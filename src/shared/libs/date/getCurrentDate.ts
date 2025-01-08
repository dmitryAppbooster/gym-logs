export const getCurrentDateWithOutTime = (): string => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0"); // День с ведущим нулем
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяц с ведущим нулем (начинается с 0)
  const year = date.getFullYear(); // Год

  return `${day}.${month}.${year}`;
};

export const getCurrentDate = (): string => {
  const date = new Date();

  return date.toDateString();
};
