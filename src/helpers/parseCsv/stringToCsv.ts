export default function stringToCsv(csvString: string) {
  const csvLines = csvString.split(/\r?\n/);

  if (csvLines.length > 1 && !csvLines[csvLines.length - 1]) {
    csvLines.pop();
  }

  const headers = csvLines.shift()?.split(',') || [];

  const jsonData = csvLines.map((line) => {
    const values = line.split(',');
    const csvObject: Record<string, string> = {};
    headers.forEach((header, index) => {
      csvObject[header] = values[index] || '';
    });
    return csvObject;
  });
  return jsonData;
}
