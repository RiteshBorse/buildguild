export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  