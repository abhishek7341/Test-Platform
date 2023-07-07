import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import cmsService, { addTitle } from "../../services/cmsService";
import { IContent } from "../../utility/interfaces/IContent";
import AdminFormLabel from "../../components/UI/adminAddEditForm/AdminFormLabel";
import TextEditor from "../../components/textEditor/TextEditor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MAXIMUM_LENGTH, MINIMUM_LENGTH } from "../../utility/constants/index";
import AddEditFormLayout from "../../components/UI/adminAddEditForm/AddEditFormLayout";
import { CmsStatus } from "../../utility/enum/cms-status";

const myTheme = createTheme({});

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(MINIMUM_LENGTH, "Title must be at least 2 characters")
    .max(MAXIMUM_LENGTH, "Title must be at least 255 characters")
    .matches(
      /^[A-Z][A-Za-z]*$/,
      "Title must start with a capital letter & Should not contain any number"
    ),

  description: Yup.string()
    .required("Description is required")
    .min(MINIMUM_LENGTH, "Description must be at least 2 characters")
    .max(MAXIMUM_LENGTH, "Description must be at most 255 characters"),

  slug: Yup.string()
    .required("Slug is required")
    .min(MINIMUM_LENGTH, "Slug must be at least 2 characters")
    .max(MAXIMUM_LENGTH, "Slug must be at most 255 characters")
    .matches(
      /^[A-Z][A-Za-z]*$/,
      "Slug must start with a capital letter & Should not contain any number"
    ),

  status: Yup.number().required("Status is required"),
});

const AddEditCms = () => {
  const navigate = useNavigate();

  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [contentData, setContentData] = useState<IContent>();
  const [status, setStatus] = useState();
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const { contentId } = useParams();

  useEffect(() => {
    if (contentId) {
      setIsAdd(false);
      cmsService.fetchContentData(+contentId).then((response) => {
        setContentData(response.data.data);
      });
    } else {
      setIsAdd(true);
    }
  }, [contentId]);

  const formik = useFormik({
    initialValues: {
      title: contentData ? contentData.title : "",
      description: contentData ? contentData.description : "",
      slug: contentData ? contentData.slug : "",
      status: contentData ? contentData.status : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      navigate("/admin/cms");
      try {
        await cmsService.addEditTitle({
          id: contentId ? +contentId : 0,
          title: values.title,
          description: values.description,
          slug: values.slug,
          status: values.status,
        });
        if (contentData) {
          toast.success("Content edited successfully!");
        } else {
          toast.success("Content added successfully!");
        }
      } catch (e: any) {
        toast.error(e.response.data.Errors.Slug);
      }
    },
  });

  useEffect(() => {
    if (contentData) {
      formik.setFieldValue("title", contentData.title);
      formik.setFieldValue("description", contentData.description);
      formik.setFieldValue("slug", contentData.slug);
      formik.setFieldValue("status", contentData.status);
    }
  }, [contentData]);

  const handleTextEditorChange = (data: string) => {
    formik.setFieldValue("description", data);
  };

  return (
    <>
      <AddEditFormLayout isAdd={isAdd}>
        <form onSubmit={formik.handleSubmit}>
          <AdminFormLabel>Title</AdminFormLabel>
          <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
            <TextField
              type="text"
              variant="outlined"
              color="warning"
              {...formik.getFieldProps("title")}
              fullWidth
            />
          </Stack>
          {formik.touched.title && formik.errors.title && (
            <div style={{ color: "red" }}>{formik.errors.title}</div>
          )}

          <AdminFormLabel>Description</AdminFormLabel>
          <TextEditor
            id="desc"
            name="desc"
            value={contentData ? contentData.description : ""}
            onChange={handleTextEditorChange}
          />
          {formik.touched.description && formik.errors.description && (
            <div style={{ color: "red" }}>{formik.errors.description}</div>
          )}

          <AdminFormLabel>Slug</AdminFormLabel>
          <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
            <TextField
              type="text"
              variant="outlined"
              color="warning"
              {...formik.getFieldProps("slug")}
              fullWidth
            />
          </Stack>
          {formik.touched.slug && formik.errors.slug && (
            <div style={{ color: "red" }}>{formik.errors.slug}</div>
          )}

          <AdminFormLabel>Status</AdminFormLabel>
          <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
            <Select
              variant="outlined"
              color="warning"
              {...formik.getFieldProps("status")}
              fullWidth
            >
              <MenuItem value={CmsStatus.Inactive}>InActive</MenuItem>
              <MenuItem value={CmsStatus.Active}>Active</MenuItem>
            </Select>
          </Stack>
          {formik.touched.status && formik.errors.status && (
            <div style={{ color: "red" }}>{formik.errors.status}</div>
          )}

          <ThemeProvider theme={myTheme}>
            <Stack direction="row" justifyContent="flex-end" mt={3}>
              <Button
                variant="outlined"
                color="warning"
                type="button"
                sx={{ marginRight: 2, borderRadius: "50px" }}
                onClick={formik.handleReset}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="warning"
                sx={{ marginRight: 4, borderRadius: "50px" }}
              >
                Save
              </Button>
            </Stack>
          </ThemeProvider>
        </form>
      </AddEditFormLayout>
    </>
  );
};

export default AddEditCms;
