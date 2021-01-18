import { parse } from 'papaparse';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertData, getYearList } from '../../util/tools';

export const Dropzone = ({ handleNewData, handleYearList }) => {
  //when you drop file, dropzone gives you acceptedFiles object
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    //in order to parse it you need to use FileReader on it
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onload = () => {
      //here is where you use papaparse, header true to make first row of csv file as property keys
      const csvData = parse(reader.result, { header: true });

      handleNewData(convertData(csvData));
      handleYearList(getYearList(convertData(csvData)));
    };

    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='dropzone__description'>
        <span>Drag 'n' Drop a file here</span>
        <span>or click to upload</span>
      </p>
    </div>
  );
};
