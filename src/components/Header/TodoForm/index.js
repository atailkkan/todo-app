import React from 'react'
import { Formik, Field, Form } from 'formik'
import validationSchema from "./validations"
import { useTodo } from "../../../contexts/TodoContext"

function TodoForm() {

  const { addTodo } = useTodo()

  return (
    <Formik initialValues={{ text: '' }} onSubmit={(values, {resetForm}) => { addTodo(values.text); resetForm()  }} validationSchema={validationSchema}>
      <Form>
          <Field className="new-todo" id="text" name="text" placeholder="What needs to be done?" autoFocus />
      </Form>
    </Formik>
  )
}

export default TodoForm