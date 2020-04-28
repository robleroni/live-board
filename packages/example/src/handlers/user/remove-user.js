import app from '../../client.js';

const RemoveUserHandler = event => {
  const userId = event.payload.userId;
  const $user  = document.getElementById('user-' + userId);

  if(!$user) {
    return;
  }

  app.dom.remove($user);
}

export default RemoveUserHandler;