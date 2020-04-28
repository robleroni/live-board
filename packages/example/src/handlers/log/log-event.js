import app      from '../../client.js';
import Template from '../../../../web/src/template.js';

const LogEventHandler = event => {
  const $logContent = document.getElementById('log-content');

  if(!$logContent) {
    return;
  }

  const $log = Template(`
    <div class="log-entry ${event.inConflict ? 'warning' : ''} ">
      <div class="log-payload">
        <div>${event.type}</div>
        <br />
        ${Object.keys(event.payload).reduce((data, key) => data + `<div>${key}: ${event.payload[key]}</div>`, "")}
      </div>
      <div class="log-meta">
        <div>${event.id}</div>
        <div>
          &uarr;
          <img src="https://avatars.dicebear.com/v2/bottts/${encodeURI(event.userId)}.svg" title="${event.userId}" alt="${event.userId}">
        </div>
        <div>${event.lastEventId}</div>
      </div>
    </div>
  `);

  app.dom.prepend($logContent, $log);
}

export default LogEventHandler;