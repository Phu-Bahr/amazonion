import { useState } from 'react';
import Dropzone from './Dropzone';

export default function WelcomeModal({ handleNewData, handleYearList, data }) {
  const [index, setIndex] = useState(100);

  return (
    <section className='welcome-container' style={{ zIndex: index }}>
      <div className='welcome-modal'>
        <h1 className='welcome-modal__header'>amazonion</h1>
        <h2 className='welcome-modal__mini-header'>
          An amazon orders Data Visualizer
        </h2>
        <p className='welcome-modal__paragraph'>
          Just follow these 3 steps to get started:
        </p>
        <ul className='welcome-modal__steps'>
          <li className='welcome-modal__steps--step'>
            <strong>Step 1.</strong> Click{' '}
            <a
              href='https://www.amazon.com/gp/b2b/reports'
              target='_blank'
              className='welcome-modal__steps--step-link'
            >
              Here
            </a>{' '}
            to go to Amazon's order history page.
          </li>
          <li className='welcome-modal__steps--step'>
            <strong>Step 2.</strong> Request Report. Type &rarr; Items, Start
            and End Date.
          </li>
          <li className='welcome-modal__steps--step'>
            <strong>Step 3.</strong> Choose file or Drag n Drop file over the
            box below.
          </li>
        </ul>

        <Dropzone
          handleNewData={handleNewData}
          handleYearList={handleYearList}
          data={data}
        />
      </div>
    </section>
  );
}
