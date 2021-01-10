import { parse } from 'papaparse';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import dayjs from 'dayjs';

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

      const convertDate = csvData.data.map((x) => ({
        ...x,
        //converts to 1/20, should i convert to month only and add year?
        'Order Date': dayjs(x['Order Date']).format('MM/YYYY'),
        'Item Total': parseFloat(x['Item Total'].replace(/[^0-9.-]+/g, '')),
      }));

      const sumPerMonth = convertDate.reduce((acc, cur) => {
        acc[cur['Order Date']] =
          acc[cur['Order Date']] + cur['Item Total'] || cur['Item Total'];
        return acc;
      }, {});

      handleNewData(sumPerMonth);
    };

    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
