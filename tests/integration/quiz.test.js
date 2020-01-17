 const request=require('supertest');
 let server;
 const {Quiz}=require('../../models/quiz')
 const {Question}=require('../../models/question')


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
            expect(res.body.some(q=>q.title==="cloud")).toBeTruthy()
            expect(res.body.some(q=>q.title==="programming")).toBeTruthy()
        })

        it('should return 404 if no quizes found',async()=>{

            const res=await request(server).get('/api/quiz/listAll')

            expect(res.status).toBe(404)
        })
    })

    describe('/show',()=>{

        it('should return 200 and display the quiz of the given id',async()=>{

            let quiz=new Quiz({title:'programming',description:'nodejs'})
            quiz.save()

            const res=await request(server).post('/api/quiz/show').send({quizID:quiz._id})

            expect(res.status).toBe(200)
            //database assertion
            expect(res.body).toMatchObject({title:'programming',description:'nodejs'})
        })

        it('should return 400 if invalid quiz id was given',async()=>{

            const res=await request(server).post('/api/quiz/show').send({quizID:'1'})

            expect(res.status).toBe(400)
        })

        it('should return 404 if the quiz is not found',async()=>{

            const res=await request(server).post('/api/quiz/show').send({quizID:'5e13ca2a6559c3097819befb'})

            expect(res.status).toBe(404)
        })
    })

    describe('/create',()=>{
        let token;
        let quiz;
        const exec=async()=>{
            //define the happy path with parameters then change one parameter in each test case 
            //depend on test name
            return await request(server)
            .post('/api/quiz/create')
            .set('x-fake-token',token)
            .send(quiz)

        }
        beforeEach(()=>{
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
            quiz={title:'programming',description:'nodejs'}
        })

        it('should return 401 if no token provided',async()=>{
            
            token=''
            const res=await exec()
            expect(res.status).toBe(401)
        })

        it('should return 400 if quiz is invalid',async()=>{

            quiz=''
            const res=await exec()
            expect(res.status).toBe(400)
        })

        it('should return 200 if quiz created successfully',async()=>{

            const res=await exec()
            expect(res.status).toBe(200)
            //database assertion
            const result=await Quiz.find({})
            expect(result.length).toBe(1)
        })
    })

    describe('/addQuestion',()=>{

        let token;
        let question;
        let quiz;
        const exec=async()=>{

            return await request(server)
            .post('/api/quiz/addQuestion')
            .set('x-fake-token',token)
            .send(question)
        }
        beforeEach(async()=>{
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
            quiz=new Quiz({title:'programming',description:'nodejs'})
            await quiz.save()
            question= {"quizID":quiz._id,"type":"multiple choice","body":"what is today",
                        "options":["wed","tues","fri"],"correct_answer":["tues","xxx"]}

        })

        it('shuold add the question to the quiz and return 200',async()=>{

            const res=await exec()
            expect(res.status).toBe(200)

            //database assertion
            const result=await Quiz.findById(quiz._id)
            expect(result.questions.length).toBe(1)
        
        })

        it('shuold return 400 if invalid quiz id was provided',async()=>{

            question={"quizID":123}
            const res=await exec()
            expect(res.status).toBe(400)
        })


        it('should return 401 if no token was provided',async()=>{

            token=""
            const res=await exec()
            expect(res.status).toBe(401)
        })

        it('should return 400 if invalid token was provided',async()=>{

            token="123"
            const res=await exec()
            expect(res.status).toBe(400)
        })  
    })

    describe('/removeQuestion',()=>{
        
        let token;
        let question;
        let quiz;

        const exec=async()=>{

            return await request(server)
            .post('/api/quiz/removeQuestion')
            .set('x-fake-token',token)
            .send(
                {
                    "quizID":quiz._id,
                    "questionID":question._id
                })
        }

        beforeEach(async()=>{

            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFobW91ZCIsImVtYWlsIjoibWFobW91ZG5hc3NpZnB0cDM5QGdtYWlsLmNvbSIsImlhdCI6MTU3ODQxMzc2OH0.NaWJz39m6ZytS_2omfCmVdTIet3JoeNfpYDlMG1ev3Y"
            question=new Question({"type":"multiple choice","body":"what is today",
                                   "options":["wed","tues","fri"],"correct_answer":["tues","xxx"]})
            quiz=new Quiz({title:'programming',description:'nodejs',questions:[question]})
            await quiz.save()

        })

        it('shuold remove the question from the quiz and return 200',async()=>{

            const res=await exec()
            expect(res.status).toBe(200)
            //database assertion
            // const result=await Quiz.findById(quiz._id)
            // expect(result.questions.length).toBe(0)
        })

        it('should return 401 if no token was provided',async()=>{

            token=''
            const res=await exec()
            expect(res.status).toBe(401)
        })

        it('should return 400 if invalid token was provided',async()=>{

            token=123
            const res=await exec()
            expect(res.status).toBe(400)
        })

        it('shuold return 400 if invalid quiz id was provided',async()=>{

            quiz={_id:""}
            const res=await exec()
            expect(res.status).toBe(400)
        })

        it('shuold return 400 if invalid question id was provided',async()=>{

            question={_id:""}
            const res=await exec()
            expect(res.status).toBe(400)
        })
        
    })
})