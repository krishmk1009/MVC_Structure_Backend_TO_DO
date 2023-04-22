import Errorhandler from "../middleware/error.js";
import Task from "../models/task.js";

export const newPost = async (req, res, next) => {

    try {
        const { title, description } = req.body;

        await Task.create({ title, description, user: req.user })


        res.status(201).json({
            success: true,
            message: "task created succesfully"
        })

    } catch (error) {
        next(error)
    }

}


export const getMyTask = async (req, res, next) => {
    try {
        const user = req.user;

        const tasks = await Task.find({ user: user._id })

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }

}


export const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return next(new Errorhandler("Invalid Id", 404))
        }


        task.isCompleted = !task.isCompleted;
        await task.save();
        return res.status(200).json({
            success: true,
            message: "task updated succesfully"
        })

    } catch (error) {
        next(error)
    }



}


export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return next(new Errorhandler("Invalid Id", 404))
        }

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "task deleted succesfully"
        })
    } catch (error) {
        next(error)
    }


}