import { parse } from 'papaparse';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertDateAndTotal } from '../util/tools';

export default function Dropzone({ data, handleNewData }) {
  //when you drop file, dropzone gives you acceptedFiles object
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    //in order to parse it you need to use FileReader on it
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onload = () => {
      //here is where you use papaparse, header true to make first row of csv file as property keys
      const csvData = parse(reader.result, { header: true });

      //sum up each month per year Jan/2011: $500.00, Jan/2012: $400.00
      const sumPerMonth = convertDateAndTotal(csvData.data).reduce(
        (acc, cur) => {
          acc[cur['Order Date']] =
            acc[cur['Order Date']] + cur['Item Total'] || cur['Item Total'];
          return acc;
        },
        {}
      );

      //convert each summed up month to x y cordinates. month: value => x: month, y: value, year: year
      const coordinates = Object.entries(sumPerMonth).map(([key, value]) => {
        return {
          x: key.split('/').shift(),
          y: value,
          year: key.split('/').pop(),
        };
      });

      console.log('coord', coordinates);
      handleNewData(coordinates);
    };

    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });

  console.log(data);

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='dropzone__description'>
        <span>Drag 'n' Drop a file here</span>
        <span>or click to upload</span>
      </p>
      <section>
        {data.data &&
          data.data.map((purchase, idx) => (
            <div key={idx}>{purchase.Title}</div>
          ))}
      </section>
    </div>
  );
}
