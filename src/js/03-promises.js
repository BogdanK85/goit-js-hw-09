
const formPromis = document.querySelector('.form');
formPromis.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}

function onSubmitForm(event) {
  event.preventDefault();
  const { elements: { delay, step, amount } } = event.currentTarget;
  const currentAmount = Number(amount.value);
  const currentStep = Number(step.value);
  let currentDelay = Number(delay.value);

  for (let i = 1; i <= currentAmount; i += 1) {
    const promise = createPromise(i, currentDelay);
    inputPromise(promise);
    currentDelay += currentStep;
  }
}

function inputPromise(promise) {
  promise.then(({ position, delay }) => {
    console.log(`Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
      console.log(`Rejected promise ${position} in ${delay}ms`);
    });
}