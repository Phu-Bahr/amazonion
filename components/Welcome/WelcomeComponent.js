import { Dropzone } from './Dropzone';

export const WelcomeModal = ({ handleNewData, handleYearList, data }) => {
  return (
    <section
      className={
        data.length == 0 ? 'welcome-container' : 'welcome-container-out'
      }
    >
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
            <strong>Step 1.</strong> Click this{' '}
            <a
              href='https://www.amazon.com/gp/b2b/reports'
              target='_blank'
              className='welcome-modal__steps--step-link'
              rel='noopener'
            >
              Amazon Orders Link
            </a>{' '}
            to go to order history page.
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
};
