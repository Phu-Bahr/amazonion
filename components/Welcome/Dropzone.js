import { parse } from 'papaparse';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertData, getYearList } from '../../util/tools';
import { useMemo } from 'react';

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

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });

  //dragging file over dnd actions
  const activeStyle = {
    borderColor: '#ff9900',
    color: '#ff9900',
  };

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className='dropzone' {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p className='dropzone__description'>
        <span>Drag 'n' Drop a file here</span>
        <span>or click to upload</span>
      </p>
    </div>
  );
};
