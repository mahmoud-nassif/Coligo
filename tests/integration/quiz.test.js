 const request=require('supertest');
 let server;
 const Quiz=require('../../models/quiz')
 const jwt=require('jsonwebtoken')

describe('/api/quiz',()=>{

    beforeEach(()=>{
        server=require('../../server')
    })
    afterEach(async()=>{
        server.close();
         await Quiz.remove({})
    })

    describe('/listAll',()=>{
        it('should return all quizes',async()=>{
            await Quiz.collection.insertMany([
                {title:'cloud',description:'devops'},
                {title:'programming',description:'nodejs'}
            ])
            const res=await request(server).get('/api/quiz/listAll')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
        })
        it('should return 404 if no quizes found',async()=>{
            const res=await request(server).get('/api/quiz/listAll')
            expect(res.status).toBe(404)
        })
    })

    describe('/show',()=>{
        it('should display the quiz of the given id',async()=>{
            let quiz=new Quiz({title:'programming',description:'nodejs'})
            quiz.save()
            const res=await request(server).post('/api/quiz/show').send({quizID:quiz._id})
            expect(res.status).toBe(200)
        })
        it('should return 404 if invalid id was given',async()=>{
            const res=await request(server).post('/api/quiz/show').send({quizID:'1'})
            expect(res.status).toBe(404)
        })
        it('should return 404 if the quiz is not found',async()=>{
            const res=await request(server).post('/api/quiz/show').send({quizID:'5e13ca2a6559c3097819befb'})
            expect(res.status).toBe(404)
        })
    })

    describe('/create',()=>{
        it('should return 401 if no token provided',async()=>{
            const res=await request(server).post('/api/quiz/create').send({title:'programming',description:'nodejs'})
            expect(res.status).toBe(401)
        })
        it('should return 400 if quiz is invalid',async()=>{
            let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
            const res=await request(server)
            .post('/api/quiz/create')
            .set('x-fake-token',token)
            .send({title:'programming',description:'nodejs'})
            expect(res.status).toBe(200)
        })
        it('should return 200 if quiz created successfully',async()=>{
            let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
            const res=await request(server)
            .post('/api/quiz/create')
            .set('x-fake-token',token)
            .send({title:'programming',description:'nodejs'})
            expect(res.status).toBe(200)
        })
    })
    describe('/addQuestion',()=>{
        it('shuold add the question to the quiz and return 200',async()=>{
            let quiz=new Quiz({title:'programming',description:'nodejs'})
            quiz.save()
            let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
            const res=await request(server)
            .post('/api/quiz/addQuestion')
            .set('x-fake-token',token)
            .send(
                {
                    "quizID":quiz._id,
                    "type":"radio",
                    "body":"what is today",
                    "options":["wed","tues","fri"],
                    "correct_answer":"tues"
                 })
            expect(res.status).toBe(200)
        })
        it('should return 401 if no token was provided',async()=>{
            const res=await request(server)
            .post('/api/quiz/addQuestion')
            .send(
                {
                    "quizID":"dfghgfds",
                    "type":"radio",
                    "body":"what is today",
                    "options":["wed","tues","fri"],
                    "correct_answer":"tues"
                 })
            expect(res.status).toBe(401)
        })
        it('should return 400 if invalid token was provided',async()=>{
            const res=await request(server)
            .post('/api/quiz/addQuestion')
            .set('x-fake-token',"65435")
            .send(
                {
                    "quizID":"dfghgfds",
                    "type":"radio",
                    "body":"what is today",
                    "options":["wed","tues","fri"],
                    "correct_answer":"tues"
                 })
            expect(res.status).toBe(400)
        })  
    })
    describe('/removeQuestion',()=>{
        it('shuold remove the question from the quiz and return 200',async()=>{
            let question={
               "type":"radio",
               "body":"what is today",
               "options":["wed","tues","fri"],
               "correct_answer":"tues"
            }
            let quiz=new Quiz({title:'programming',description:'nodejs',questions:[question]})
            quiz.save()
            let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
            const res=await request(server)
            .post('/api/quiz/removeQuestion')
            .set('x-fake-token',token)
            .send(
                {
                    "quizID":quiz._id,
                    "questionID":question._id
                })
            expect(res.status).toBe(200)
        })
        it('should return 401 if no token was provided',async()=>{
            const res=await request(server)
            .post('/api/quiz/removeQuestion')
            .send(
                {
                    "quizID":"dfghgfds",
                    "type":"radio",
                    "body":"what is today",
                    "options":["wed","tues","fri"],
                    "correct_answer":"tues"
                 })
            expect(res.status).toBe(401)
        })
        it('should return 400 if invalid token was provided',async()=>{
            const res=await request(server)
            .post('/api/quiz/removeQuestion')
            .set('x-fake-token',"65435")
            .send(
                {
                    "quizID":"dfghgfds",
                    "type":"radio",
                    "body":"what is today",
                    "options":["wed","tues","fri"],
                    "correct_answer":"tues"
                 })
            expect(res.status).toBe(400)
        })
        
    })
})