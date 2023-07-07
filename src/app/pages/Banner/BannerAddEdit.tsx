import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import AddEditFormLayout from "../../components/UI/adminAddEditForm/AddEditFormLayout";
import Dropzone from "react-dropzone";
import CustomButton from "../../components/UI/CustomButton";
import CustomTextField from "../../components/TextField/CustomTextField";
import CancelButton from "../../components/UI/CancelButton";
import { Link } from "react-router-dom";
import { AppRoutings } from "../../utility/enum/app-routings";
import AdminFormLabel from "../../components/UI/adminAddEditForm/AdminFormLabel";
import { addBanner, editBanner, getBanner } from "../../services/bannerService";
import { toast } from "react-toastify";
import { IBannerData } from "../../utility/interfaces/banner";
import AddIcon from "@mui/icons-material/Add";
import { getData } from "../../utility/helper";
import { Status } from "../../utility/enum/status";

const BannerAddEdit = () => {
  const navigate = useNavigate();
  const imagePath = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();
  const fetchData = async () => {
    try {
      const response = await getBanner(param.bannerId as string);
      imagePath.current = response.data.data.bannerImagePath;
      const values: IBannerData = {
        bannerText: response.data.data.bannerText,
        sortOrder: response.data.data.sortOrder,
        status:
          response.data.data.status == "Active"
            ? Status.Active
            : Status.InActive,
      };
      setValues(values);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    param.bannerId && fetchData();
  }, [param.bannerId]);
  const initialValue: IBannerData = {
    bannerText: "",
    sortOrder: 0,
    status: 2,
    image: null,
  };
  const validationSchema = Yup.object().shape({
    image: param.bannerId
      ? Yup.mixed()
      : Yup.mixed().required("Image is required"),
    bannerText: Yup.string().required("Banner text is required"),
    sortOrder: Yup.number().required("Sort order is required"),
    status: Yup.string().required("Status is required"),
  });
  const handleImageDrop = (acceptedFiles: File[]) => {
    setFieldValue("image", acceptedFiles[0]);
  };
  const {
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    values,
    getFieldProps,
    setValues,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values: IBannerData) => {
      setIsLoading(true);
      try {
        const payload = new FormData();
        payload.append("BannerText", values.bannerText);
        payload.append("SortOrder", values.sortOrder.toString());
        payload.append("Status", values.status.toString());
        payload.append("Image", values.image as File);
        const response = param.bannerId
          ? await editBanner(payload, param.bannerId)
          : await addBanner(payload);
        toast.success(response.data.message);
        navigate(AppRoutings.BannerListing);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    },
  });
  return (
    <AddEditFormLayout isAdd={!param.bannerId}>
      {isLoading ? (
        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <CircularProgress sx={{ color: "orange" }} />
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
            <AdminFormLabel htmlFor="bannerText">
              Banner Text<span className="required"> *</span>
            </AdminFormLabel>
            <CustomTextField
              type="text"
              id="bannerText"
              placeholder="Enter banner text"
              variant="outlined"
              {...getFieldProps("bannerText")}
              error={touched.bannerText && errors.bannerText ? true : false}
              helperText={touched.bannerText && errors.bannerText}
            />
          </FormControl>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <AdminFormLabel htmlFor="bannerImage">
              Banner Image<span className="required"> *</span>
            </AdminFormLabel>
            <Dropzone onDrop={handleImageDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  style={{
                    textAlign: "center",
                    border: "1px solid rgb(196, 196, 196)",
                    borderRadius: "4px",
                    width: "90%",
                  }}
                >
                  <input
                    {...getInputProps()}
                    id="bannerImage"
                    accept="image/*"
                  />
                  {values.image ? (
                    <img
                      width="550px"
                      src={URL.createObjectURL(values.image)}
                      alt="Preview"
                    />
                  ) : param.bannerId ? (
                    <img width="550px" src={imagePath.current} alt="Preview" />
                  ) : (
                    <>
                      <AddIcon sx={{ fontSize: "80px" }} />
                      <p>
                        Drag 'n' drop an image here, or click to select an image
                      </p>
                    </>
                  )}
                </div>
              )}
            </Dropzone>
            {errors.image && touched.image && (
              <FormHelperText className="required">
                {errors.image}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <FormControl sx={{ marginBottom: "1rem", width: "10rem" }}>
              <AdminFormLabel htmlFor="bannerText">
                Sort Order<span className="required"> *</span>
              </AdminFormLabel>
              <CustomTextField
                type="number"
                id="sortOrder"
                placeholder="Enter sort order"
                variant="outlined"
                {...getFieldProps("sortOrder")}
                error={touched.sortOrder && errors.sortOrder ? true : false}
                helperText={touched.sortOrder && errors.sortOrder}
              />
            </FormControl>
          </Box>
          <FormControl sx={{ marginBottom: "1rem", minWidth: "10rem" }}>
            <AdminFormLabel htmlFor="status">
              Status<span className="required"> *</span>
            </AdminFormLabel>
            <Select id="status" {...getFieldProps("status")}>
              <MenuItem value={Status.Active}>Active</MenuItem>
              <MenuItem value={Status.InActive}>InActive</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ textAlign: "right", margin: "auto 2rem" }}>
            <CancelButton onClick={() => navigate(AppRoutings.BannerListing)}>
              Cancel
            </CancelButton>
            <CustomButton type="submit">Submit</CustomButton>
          </Box>
        </form>
      )}{" "}
    </AddEditFormLayout>
  );
};
export default BannerAddEdit;
