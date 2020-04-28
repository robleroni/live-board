import app  from '../../client.js';
import user from '../../../../core/src/user.js';

const CreateUserHandler = event => {
  const userId = event.payload.userId;
  const $users = document.getElementById('userList');

  if(!$users) {
    return;
  }

  const $user     = document.createElement('li');
  $user.id        = 'user-' + userId;
  $user.innerHTML = `<img width="30px" src="https://avatars.dicebear.com/v2/bottts/${encodeURI(userId)}.svg" alt="${userId}" title="${userId}">`;

  if(userId === user.getUserId()) {
    $user.style.border = '1px solid red';
  }

  app.dom.append($users, $user);
}

export default CreateUserHandler;