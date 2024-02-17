```mermaid
  sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Writes note and clicks Save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: New Note data
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->browser: HTML document with newly added note data
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JS file that adds a new list to the notes app
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [...,{content: "sequence diagram exercise", date: "2024-02-17T12:52:21.122Z"}]
    deactivate server

    browser-->>user: Displays New Note
    

  ```