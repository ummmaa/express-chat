<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat App</title>
    <style>
      .chat {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .messages {
        flex: 1;
        overflow-y: auto;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .form {
        display: flex;
      }
      .input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
      }
      .submit {
        padding: 10px;
        border: 1px solid #ccc;
        background: #eee;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="chat">
      <ul class="messages"></ul>
      <form class="form">
        <input class="input" autocomplete="off" />
        <button class="submit">Send</button>
      </form>
    </div>

    <script>
      function main() {
        const host = location.origin.replace(/^http/, 'ws')
        const ws = new WebSocket(host + '/ws')

        const form = document.querySelector('.form')

        form.onsubmit = function (e) {
          e.preventDefault()
          const input = document.querySelector('.input')
          const text = input.value
          ws.send(text)
          input.value = ''
          input.focus()
        }

        ws.onmessage = function (msg) {
          const response = msg.data
          const messageList = document.querySelector('.messages')
          const li = document.createElement('li')
          li.textContent = response
          messageList.appendChild(li)
        }

        ws.onerror = function (error) {
          console.error('WebSocket Error: ', error)
        }
      }

      main()
    </script>
  </body>
</html>