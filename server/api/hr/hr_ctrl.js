const hrCollection = require('./hr_model')
const DB = require('../../utils/DB.utils')
const { authToken } = require('../../utils/register.utils')
const { getDoc, updateDoc, deleteDoc, getAllDocs, filteredPrivateProps } = DB
const {idChecker,tokenChecker,successHandler,failHandler,queryHandler} = require('../../utils/ctrl.utils')

/**
 * get hr by id from hr collection
 * @param {*} req 
 * @param {*} res 
 */
async function getHrByUrlId(req, res) {
    const token = req.headers.authorization
    const _id = req.params.Id;
    if(idChecker(_id,res) !== true) return
    if(tokenChecker(token,res) !== true) return
    const query = { _id }
    const getDocSuccessCb = (data)=> successHandler(data,'got')
    const getDocFailCb = () => failHandler('user',res)
    try {
        authToken(token, async() => {
            const getRes = await getDoc(hrCollection, query, getDocSuccessCb, getDocFailCb)
            if (getRes && getRes.error) throw new Error(getRes.error);
        }, res)
    } catch (err) {
        res.status(400).json({ success: false, error })
    }
}
/**
 * get hr from hr collection
 * @param {*} req 
 * @param {*} res 
 */
async function getHr(req, res) {
    const token = req.headers.authorization
    const query = req.body.user;
    if(queryHandler(query,res) !== true) return
    const { email } = query
    if(tokenChecker(token,res) !== true) return
    const getDocSuccessCb = (data)=> successHandler(data,res,'got')
    const getDocFailCb = () => failHandler(email,res)
    try {
        authToken(token, async(data) => {
            const getRes = await getDoc(hrCollection, query, getDocSuccessCb, getDocFailCb)
            if (getRes && getRes.error) throw new Error(getRes.error);
        }, res)
    } catch (error) {
        res.status(400).json({ success: false, error })
    } 
}
/**
 * update hr from hr collection
 * @param {*} req 
 * @param {*} res 
 */
async function updateHrById(req, res) {
    const token = req.headers.authorization
    const query = req.body.user;
    const { _id } = query;
    if(idChecker(_id,res) !== true) return
    if(tokenChecker(token,res) !== true) return
    const updateDocSuccessCb = (data)=> successHandler(data,res,'updated')
    const updateDocFailCb = () => failHandler(_id,res)
    try {
        authToken(token, async() => {
            const getRes = await updateDoc(hrCollection, query, updateDocSuccessCb, updateDocFailCb)
            if (getRes && getRes.error) throw new Error(getRes.error)
        }, res)
    } catch (error) {
        res.status(400).json({ success: false, error })
    } 
}
/** 
 * delete hr from hr collection
 * @param {*} req 
 * @param {*} res 
 */
async function deleteHrById(req, res) {
    const token = req.headers.authorization
    const query = req.body.user;
    const { _id } = query;
    if(idChecker(_id,res) !== true) return
    if(tokenChecker(token,res) !== true) return
    const deleteDocSuccessCb = (data)=> successHandler(data,res,'deleted')
    const deleteDocFailCb = () => failHandler(_id ,res)
   try {
        authToken(token, async() => {
            const getRes = await deleteDoc(hrCollection, query, deleteDocSuccessCb, deleteDocFailCb)
            if (getRes && getRes.error) throw new Error(getRes.error)
        }, res)
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    } 
}
/** 
 * get all hrs from hr collection
 * @param {*} req 
 * @param {*} res 
 */
async function getAllHrs(req, res) {
    const token = req.headers.authorization
    if(tokenChecker(token,res) !== true) return
    const getAllDocsSuccessCb = (data)=> successHandler(data,res,'list')
    const getAllDocsFailCb = () => failHandler('list',res)
    try {
        authToken(token, async() => {
            const getRes = await getAllDocs(hrCollection, getAllDocsSuccessCb, getAllDocsFailCb)
            if (getRes && getRes.error) throw new Error(getRes.error)
        }, res)
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

module.exports = {
    getHrByUrlId,
    getHr,
    updateHrById,
    deleteHrById,
    getAllHrs
};