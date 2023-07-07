import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Box, FormControl, Grid, MenuItem, Select } from "@mui/material";
import AddEditFormLayout from "../../components/UI/adminAddEditForm/AddEditFormLayout";
import { IMissionThemePayload } from "../../utility/interfaces/payload";
import CustomTextField from "../../components/TextField/CustomTextField";
import CustomButton from "../../components/UI/CustomButton";
import AdminFormLabel from "../../components/UI/adminAddEditForm/AdminFormLabel";
import CancelButton from "../../components/UI/CancelButton";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutings } from "../../utility/enum/app-routings";
import {
  addMissionTheme,
  editMissionTheme,
  getMissionTheme,
} from "../../services/missionTheme-service";
import { Status } from "../../utility/enum/status";

const MissionThemeAddEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getMissionTheme(params.themeId as string);
    const values: IMissionThemePayload = {
      title: response.data.data.title,
      status: response.data.data.status,
    };
    formik.setValues(values);
  };

  useEffect(() => {
    params.themeId && fetchData();
  }, [params.themeId]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Mission theme is required"),
  });
  const missionThemeValues: IMissionThemePayload = {
    title: "",
    status: Status.Active,
  };
  const formik = useFormik({
    initialValues: missionThemeValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = !params.themeId
          ? await addMissionTheme(values)
          : await editMissionTheme(params.themeId, values);
        toast.success(response.data.message);
        navigate(AppRoutings.ThemeListing);
      } catch (err: any) {
        console.log(err.response.data.Errors.Title);
      }
    },
  });
  return (
    <AddEditFormLayout isAdd={!params.themeId}>
      <Grid container>
        <Grid item xs={12} sm={4} lg={4} xl={2}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <FormControl sx={{ marginTop: "10px" }}>
              <AdminFormLabel htmlFor="Theme_Title">
                Mission Theme<span className="required"> *</span>
              </AdminFormLabel>
              <CustomTextField
                id="Theme_Title"
                placeholder="donohue"
                variant="outlined"
                {...formik.getFieldProps("title")}
                error={
                  formik.touched.title && formik.errors.title ? true : false
                }
                helperText={formik.touched.title && formik.errors.title}
              />
            </FormControl>
            <FormControl sx={{ marginTop: "10px" }}>
              <AdminFormLabel htmlFor="Theme_Select">
                Status<span className="required"> *</span>
              </AdminFormLabel>
              <Select
                autoWidth
                {...formik.getFieldProps("status")}
                id="Theme_Select"
              >
                <MenuItem value={1}>InActive</MenuItem>
                <MenuItem value={2}>Active</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ marginTop: "1rem" }}>
              <CancelButton onClick={() => navigate(AppRoutings.ThemeListing)}>
                Cancel
              </CancelButton>
              <CustomButton type="submit">Submit</CustomButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </AddEditFormLayout>
  );
};

export default MissionThemeAddEdit;
