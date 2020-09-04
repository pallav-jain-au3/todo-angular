const express = require('express');
const router = express.Router()
const { auth, db } = require("./firebase");

router.use((req, res, next) => {
    let token = req.header('Authorization')
    if (!token){
        throw err;
    }
     token = token.replace('Bearer', '')
        .trim()
    auth.verifyIdToken(token)
        .then(decodedToken => {
            req.uid = decodedToken.uid;
            next();
            return;
        }).catch(error => {
        console.error(error);
        res.send("User could not be identified")
    });
})

router.use((req, res, next) => {
    let userRef = db
        .collection("users")
        .doc(req.uid)
    let tasksRef = userRef.collection("tasks")
    req.userDocRef = userRef;
    req.tasksCollectionRef = tasksRef;
    next()
})

//TODO identify correct error codes
router.get('', (req, res) => {
    const {isComplete = false, page = 1} = req.query
    let flag = false
    if (isComplete){
        flag = true
    }
    const limit = 10
    let skips = (page - 1) * limit;
    req.tasksCollectionRef
    .orderBy("createdAt", "desc")
   .where("isComplete" ,"==", flag)
   .limit(limit)
        .get()
        .then( snapshot => {
            let docs = snapshot.docs.map(doc => {
                if (doc.exists){
                   data = doc.data()
                   data.id = doc.id;
                   return data;
                }
                return undefined
            })
            docs = docs.filter(doc => Boolean(doc));
            return Promise.resolve(docs);
        })
        .then(tasks => res.send(tasks))
        .catch(err => res.send(err))
});

router.get("/:taskId", (req, res) => {
    const {taskId} = req.params;
    return req.tasksCollectionRef
        .doc(taskId)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.send(doc.data())
            } else {
                return res.send("No such document!");
            }
        }).catch(error => {
            res.send(error);
        });
})

router.delete('/:taskId', (req, res) => {
    const {taskId} = req.params;
    return req.tasksCollectionRef
        .doc(taskId)
        .delete()
        .then(doc => {
            return res.json({status:"Deleted successfully"})
        }).catch(error => {
            return res.send(error);
        });
});

router.put('/:taskId', (req, res) => {
    const {taskId} = req.params;
    let taskUpdate = req.body.todo;
    req.tasksCollectionRef
        .doc(taskId)
        .update(taskUpdate)
        .then(() => {
            return req.userDocRef
                .collection("tasks")
                .doc(taskId)
                .get()
        })
        .then(doc => {
            if (doc.exists) {
                return res.send(doc.data())
            } else {
                return res.send("No such document!");
            }
        }).catch(error => {
        res.send(error);
    });
});

router.post('', (req, res) => {
    const taskBody = req.body.document;
    console.log(taskBody)
    let task = createTask(taskBody.title, taskBody.description);
    req.tasksCollectionRef
        .add(task)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            return docRef.get()
        })
        .then(function (snapshot) {
            let data = snapshot.data()
            data.id = snapshot.id
            return res.send(data)
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            res.send(err)
        });
});

function createTask(title, description) {
    return {
        title: title,
        description: description,
        isComplete: false,
        completedDate: null,
        createdAt : new Date().toISOString()
    };
}

module.exports = router;
