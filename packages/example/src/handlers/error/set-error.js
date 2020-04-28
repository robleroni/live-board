import app from '../../client.js';

const SetErrorHandler = event => {
  const $error = app.dom.getElementById('error');

  if (!event.payload) {
    return;
  }

  const errors       = JSON.parse($error.getElement().dataset.errors || '{}');
  const newErrors    = { ...errors, ...event.payload };
  const newErrorKeys = Object.keys(newErrors).filter(k => !!newErrors[k]);

  $error.setTextContent(newErrorKeys.map(k => newErrors[k]).join(''))
  $error.setAttribute('style', newErrorKeys.length ? 'display: initial' : 'display: none');
  $error.setAttribute('data-errors', JSON.stringify(newErrors));
}

export default SetErrorHandler;