import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId } from "react";
import * as Yup from "yup";

interface NoteFomProps {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFomProps = {
  title: "Please type..",
  content: "Content belongs here ",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("This is requered field"),
  content: Yup.string().max(500, "Too long!"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

const handleSearch = (
  values: NoteFomProps,
  actions: FormikHelpers<NoteFomProps>
) => {
  console.log("Data :", values);
  actions.resetForm();
};

export default function NoteForm() {
  const inputId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSearch}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${inputId}-title`}>Title</label>
          <Field className={css.input} type="text" name="title" />
          <ErrorMessage name="username" component="span" />
        </div>
        <div className={css.formGroup}>
          <label htmlFor={`${inputId}-content`}>Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${inputId}-tag`}>Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" />
        </div>
        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
