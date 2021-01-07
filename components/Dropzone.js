import { parse } from 'papaparse';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ data, handleNewData }) {
  //when you drop file, dropzone gives you accepted files object
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    //in order to parse it you need to use FileReader on it
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onload = () => {
      //here is where you use papaparse, header true to make first row of csv file as property keys
      const csvData = parse(reader.result, { header: true });
      // const csvData = reader.result;
      handleNewData(csvData);
    };

    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(data);
  console.log(data.data && data.data[0]['Title']);

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
