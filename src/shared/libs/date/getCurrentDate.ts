export const getCurrentDateWithOutTime = (): string => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0"); // День с ведущим нулем
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяц с ведущим нулем (начинается с 0)
  const year = date.getFullYear(); // Год

  return `${day}.${month}.${year}`;
};

export const getCurrentDate = (): string => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Возвращаем строку в формате YYYY-MM-DD HH:mm:ss
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
