export const maxNameCategory = (name, maxLength = 8) =>
  name.length > maxLength ? name.slice(0, maxLength) + ".." : name;
