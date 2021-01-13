export default function WelcomeModal() {
  return (
    <section class='welcome-container'>
      <div class='welcome-modal'>
        <h1 class='welcome-modal__header'>Amazonion</h1>
        <h2 class='welcome-modal__mini-header'>
          An Amazon orders Data Visualizer
        </h2>
        <p class='welcome-modal__paragraph'>
          Just follow these 3 steps to get started:
        </p>
        <ul class='welcome-modal__steps'>
          <li class='welcome-modal__steps--step'>
            <strong>Step 1.</strong> Click{' '}
            <a
              href='https://www.amazon.com/gp/b2b/reports'
              target='_blank'
              class='welcome-modal__steps--step-link'
            >
              Here
            </a>{' '}
            to go to Amazon's order history page.
          </li>
          <li class='welcome-modal__steps--step'>
            <strong>Step 2.</strong> Request Report. Type &rarr; Items, Start
            and End Date.
          </li>
          <li class='welcome-modal__steps--step'>
            <strong>Step 3.</strong> Choose file or Drag n Drop file over the
            next page's box.
          </li>
        </ul>
        <div className='welcome-modal__button-container'>
          <button class='welcome-modal__button-container--close-button'>
            Let's get started!
          </button>
        </div>
      </div>
    </section>
  );
}
