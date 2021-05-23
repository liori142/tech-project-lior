const studentRouter = require('express').Router()
const student_ctrl = require('../api/student/student_ctrl')


/**
 * @swagger
 * components:
 *    schemas:
 *        User:
 *          properties:
 *             id:
 *              type: integer
 *             name:
 *              type: string
 *     # Both properties are required
 *    required:  
 *      - id
 *      - name
 * 
 */
studentRouter.get('/all', student_ctrl.getAllStudents)
studentRouter.post('/student', student_ctrl.getStudent)
studentRouter.put('/student', student_ctrl.updateStudentById)
studentRouter.delete('/student', student_ctrl.deleteStudentById)
studentRouter.get('/student/:Id', student_ctrl.getStudentByUrlId)

module.exports = studentRouter;