// format date
export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};

// filter by date
export const filterByDate = (date: string) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const itemDate = new Date(date || "");
  const itemMonth = itemDate.getMonth() + 1;
  const itemYear = itemDate.getFullYear();

  return itemMonth === currentMonth && itemYear === currentYear;
};

// format date to input date (ex: 24-08-01)
export const formatDateForInput = (dateString: string) => {
  const dateObject = new Date(dateString);
  if (isNaN(dateObject.getTime())) {
    return "";
  } else {
    const year = dateObject.getFullYear();
    const month = `${dateObject.getMonth() + 1}`.padStart(2, "0");
    const day = `${dateObject.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
};

// days ago
export const daysAgo = (dateInput: string) => {
  const inputDate = new Date(dateInput).getTime();
  const currDate = new Date().getTime();
  const timeDiff = currDate - inputDate;
  const daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDifference;
};

// get current date (formatted)
export const getCurrentDateFormatted = () => {
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDay = currentDate.getDate();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const formattedDate = `${currentDay} of ${currentMonth} ${currentYear}`;
  return formattedDate;
};

// Calculate age based on the birth date
export const calculateAge = (birthDate: string) => {
  if (!birthDate) {
    return;
  }

  const currentDate = new Date();
  const dob = new Date(birthDate);

  let age = currentDate.getFullYear() - dob.getFullYear();
  const monthDiff = currentDate.getMonth() - dob.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
};
