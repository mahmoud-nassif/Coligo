# Coligo
Here's the backend challenge I was given I tried to do the optional requirement but it seems that mongo atlas has removed the sandbox plan(free plan and now requires visa credentials) however in this repository you will find the main 5 api's you need and thier testing folder download repo and run "npm install" to setup dependencies and test it with postman

postman testing requests

valid_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzMywicm9sZSI6InVzZXIiLCJpYXQiOjE1NzUyNzY2NjR9.eCAFVM2g8mytDiDUaug6_f_CHtAc-YpPLDyIBHNypQI"

1-create quiz request
http://localhost:3030/api/quiz/create 
method:post
headers:{Content-Type:application/json,x-fake-token:valid_token }
body:{title:"nodejs",description:"javascript runtime environment"}

2-add question
http://localhost:3030/api/quiz/addQuestion
method:post
headers:{Content-Type:application/json,x-fake-token:valid_token}
body:{"quizId":"","type":"text|| radio || checkbox","body":"how much","options":[],"correct_answer":string or array based on type}

3-remove question 
http://localhost:3030/api/quiz/removeQuestion
method:post
headers:{Content-Type:application/json,x-fake-token:valid_token}
body:{"quizID":"",questionID:""}

4-list all quizes
http://localhost:3030/api/quiz/listAll
method:get
headers:{Content-Type:application/json}

5-show a specific quiz
http://localhost:3030/api/quiz/show
method:post
headers:{Content-Type:application/json}
body:{quizID:""}


Working Days:
Monday:2 hours, 
Tuesday:6 hours, 
Thrusday:3 hours
