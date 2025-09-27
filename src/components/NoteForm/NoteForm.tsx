import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import css from "./NoteForm.module.css";
import type { Note } from "../../types/note";

type NoteTag = Note["tag"];

interface NoteFormProps {
  onCancel: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag | "";
}

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

export default function NoteForm({ onCancel }: NoteFormProps) {
  const initialValues: NoteFormValues = { title: "", content: "", tag: "" };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (note: { title: string; content: string; tag: NoteTag }) =>
      createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  async function handleSubmit(
    values: NoteFormValues,
    helpers: FormikHelpers<NoteFormValues>
  ) {
    try {
      await mutation.mutateAsync({
        title: values.title.trim(),
        content: values.content.trim(),
        tag: values.tag as NoteTag,
      });
      helpers.resetForm();
    } finally {
      helpers.setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title">
              {(msg) => <span className={css.error}>{msg}</span>}
            </ErrorMessage>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content">
              {(msg) => <span className={css.error}>{msg}</span>}
            </ErrorMessage>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag">
              {(msg) => <span className={css.error}>{msg}</span>}
            </ErrorMessage>
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty || isSubmitting}
            >
              {mutation.isPending ? "Creating..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
