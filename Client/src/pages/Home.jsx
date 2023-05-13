import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast'
import Taskitem from '../components/Taskitem'
const Home = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/tasks/new", {
        title, description
      },

        {
          headers: {
            "Content-Type": "application/json"
          },

          withCredentials: true
        })

      setDescription("");
      setTitle("")
      toast.success(data.message)
      setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setLoading(false);

    }




  }

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/tasks/my", {
      withCredentials: true
    })
      .then((res) => {
        // console.log(res.data.tasks)
        setTasks(res.data.tasks)
        console.log(tasks)
      })
      .catch((e) => {
        toast.error(e.response.data.message)
      })

  }, [])



  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className='todosContainer'>

        {tasks.map((i) => {

          <Taskitem title={i.title} description={i.description}  id={i._id}
            key={i._id} />

        })}

      </section>

    </div>

  )
}

export default Home