import Head from 'next/head';
import { parse } from 'papaparse';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [data, setData] = useState([]);
  //when you drop file, dropzone gives you accepted files object
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    //in order to parse it you need to use FileReader on it
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onload = () => {
      //here is where you use papaparse, header true to make first row of csv file as property keys
      const csvData = parse(reader.result, { header: true });
      setData(csvData);
    };

    // read file contents
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(data);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container'>
        <div className='dropzone' {...getRootProps()}>
          <input {...getInputProps()} />
          <p className='dropzone__description'>
            <span>Drag 'n' Drop a file here</span>
            <span>or click to upload</span>
          </p>
        </div>
      </div>
    </div>
  );
}
